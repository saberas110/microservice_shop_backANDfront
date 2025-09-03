import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Room, Message
from .serializers import MessageSerializer


@database_sync_to_async
def get_old_messages(room_name):
    query = Message.objects.filter(room__name=room_name)
    return MessageSerializer(query, many=True).data

@database_sync_to_async
def save_message(room_name, content, user_id=None):
    room, _ = Room.objects.get_or_create(name=room_name)
    return Message.objects.create(room=room, user_id=user_id, content=content)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        old_messages = await get_old_messages(self.room_name)
        await self.send(text_data=json.dumps({
            "type": "init_messages",
            "messages": old_messages
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]

        # پیام رو برای همه اعضای گروه پخش کن

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "message": message}
        )
        await save_message(self.room_name, message)

    async def chat_message(self, event):
        print(event)
        await self.send(text_data=json.dumps({
            "type": "new_message",
            "user":"",
            "content": event["message"]
        }))
