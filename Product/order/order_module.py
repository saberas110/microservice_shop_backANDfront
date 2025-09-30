import asyncio
import aiohttp
from home.models import Product
from order.models import OrderModel, OrderItemModel



AUTH_URL = 'http://localhost:8000/accounts/getuser'
async def getUser(request):
    async with aiohttp.ClientSession() as session :
        # headers = {'Authorization':request.headers.get("Authorization")}
        async with session.get(url=AUTH_URL,cookies=request.COOKIES) as response:
            return await response.json()


class OrderModule:
    def __init__(self, request):
        self.request = request
        self.data = request.data

    def set_order(self):
        address = self.data.get('address')
        user = asyncio.run(getUser(self.request))
        order, created = OrderModel.objects.get_or_create(address=address, user=user['phone_number'], is_paid=False)
        cart = self.data.get('cart')
        for item in cart.values():
            product = Product.objects.get(id=int(item['id']))
            orderitem, created = OrderItemModel.objects.get_or_create(product=product, order=order, color=item['color'],
                                            defaults={'quantity':item['qty'],
                                          "price": product.properties.get(color_code=item['color']).price})
            if not created:
                orderitem.quantity += item['qty']
                orderitem.save()


