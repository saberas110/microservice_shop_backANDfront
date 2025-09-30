import aiohttp
import asyncio
from django.db.models.expressions import result
from django.http import JsonResponse
from django.urls import reverse_lazy
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from search_service import ProductSearchService
from .authenticated import MicroserviceJWTAuthentication
from .serializers import ProductSerializer, CommentSerializer
from .models import Product, Comment
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie



IS_AUTHENTICATED_URL = 'http://127.0.0.1:8002/accounts/get/user'

async def get_user_data(auth_header):
    async with aiohttp.ClientSession() as session:
        headers = {'Authorization': auth_header}
        async with session.get(IS_AUTHENTICATED_URL, headers=headers) as response:
            return await response.json()


class CSRFTokenView(APIView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({'message':'CSRF cookie set'})

class ProductView(APIView):
    def get(self, request, pk):
        try:
            query = Product.objects.get(id=pk)
            srz_data = ProductSerializer(instance=query,context={'request':request})
            return Response(srz_data.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'message':'Product is Not exists'}, status=status.HTTP_200_OK)


class ProductListView(APIView):
    def get(self, request):
        query = Product.objects.all()
        if query.exists():
            srz_data = ProductSerializer(instance=query, many=True, context={'request':request})
            return Response(srz_data.data, status=status.HTTP_200_OK)
        return Response({'message': 'Products Not Found'}, status=status.HTTP_200_OK)

class Search(APIView):
    def get(self, request):
        service = ProductSearchService(request)
        result, serializer_class = service.select_search_method()
        srz_data = serializer_class(result, many=True, context={'request':request})
        return Response(srz_data.data, status.HTTP_200_OK)



class ProductAddView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        srz_data = ProductSerializer(data=request.POST)
        if srz_data.is_valid():
            srz_data.save()
            return Response({"message":"successfully create a product "}, status=status.HTTP_201_CREATED)
        return Response(srz_data.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserView(APIView):
    def dispatch(self, request, *args, **kwargs):
        self.auth_header = request.headers.get('Authorization')
        if not self.auth_header:
            return JsonResponse({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)
        return super().dispatch(request)
    def get(self, request):
        user_data = asyncio.run(get_user_data(self.auth_header))
        return Response(user_data)

class CommentView(APIView):
    permission_classes = [IsAuthenticated, ]
    def get(self, request):
        query = Comment.objects.all()
        srz_data = CommentSerializer(instance=query, many=True)
        return Response(srz_data.data)

    def post(self, request):
        auth_header = request.headers.get('Authorization')
        user_data = asyncio.run(get_user_data(auth_header))
        srz_data = CommentSerializer(data=request.data, context={'user_id':user_data.get('id')})
        if srz_data.is_valid():
            srz_data.create(srz_data.validated_data)
            return Response(srz_data.data, status.HTTP_201_CREATED)
        return Response(srz_data.errors, status.HTTP_400_BAD_REQUEST)