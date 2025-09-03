from rest_framework import permissions
from django.http import JsonResponse
import asyncio
import aiohttp
from rest_framework.response import Response

IS_AUTHENTICATED_URL = 'http://127.0.0.1:8000/accounts/get/user'

async def get_user_data(auth_header):
    headers = {'Authorization': auth_header}
    async with aiohttp.ClientSession() as session:
        async with session.get(IS_AUTHENTICATED_URL, headers=headers) as response:
            return await response.json()


