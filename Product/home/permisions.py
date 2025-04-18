from rest_framework import permissions
from django.http import JsonResponse
import asyncio
import aiohttp
from rest_framework.response import Response

IS_AUTHENTICATED_URL = 'http://127.0.0.1:8002/accounts/get/user'

async def get_user_data(auth_header):
    headers = {'Authorization': auth_header}
    async with aiohttp.ClientSession() as session:
        async with session.get(IS_AUTHENTICATED_URL, headers=headers) as response:
            return await response.json()



class IsAuthenticated(permissions.BasePermission):
    message = 'permision denid'
    def has_permission(self, request, view):
        self.auth_header = request.headers.get('Authorization')
        if not self.auth_header:
            return False
        user_data = asyncio.run(get_user_data(self.auth_header))
        print(user_data)
        if user_data.get('phone_number'):
            return True
        return False