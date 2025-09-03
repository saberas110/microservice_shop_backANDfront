# chat/models.py
from django.db import models
from django.conf import settings

class Room(models.Model):
    name = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user_id = models.IntegerField(null=True, blank=True)  # یا ForeignKey به سرویس یوزر اگر shared DB داری
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:20]
