import asyncio
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView, Response
import aiohttp
from order.order_module import OrderModule



AUTH_URL = 'http://localhost:8000/accounts/getuser'
async def getUser(request):
    async with aiohttp.ClientSession() as session :
        # headers = {'Authorization':request.headers.get("Authorization")}
        async with session.get(url=AUTH_URL,cookies=request.COOKIES) as response:
            return await response.json()


class OrderView(APIView):
    def get(self, request):
        user = asyncio.run(getUser(request))
        print(user['user']['phone_number'])
        return Response({'user':user})

    def post(self, request):
        order = OrderModule(request)
        order.set_order()
        return Response({"message":"سفارش شما با موفقیت ثبت شد."}, status.HTTP_201_CREATED)


