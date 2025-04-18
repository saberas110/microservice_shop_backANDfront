import datetime
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .seializers import UserRegisterSerializer, UserListSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Otp, User
from random import randint
import jwt

class RegisterOtpView(APIView):
    def post(self, request):
        phone_number = request.POST.get('phone_number')
        print(phone_number)
        random_code = randint(1000, 9999)
        try:
            otp_code = Otp.objects.get(phone_number=phone_number)
            otp_code.delete()
        finally:
            otp_code= Otp.objects.create(phone_number=phone_number, code=random_code,
                               expired_time=datetime.datetime.now()+datetime.timedelta(minutes=2))
            print(otp_code.code)
            return Response({'message':'we sent otp_code to your phone_number'})


class UserRegisterView(APIView):
    def post(self, request):
        srz_data = UserRegisterSerializer(data=request.POST)
        if srz_data.is_valid():
            srz_data.create(srz_data.validated_data)
            return Response(srz_data.data, status=status.HTTP_201_CREATED)
        return Response(srz_data.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        users = User.objects.all()
        srz_data = UserListSerializer(instance=users, many=True)
        return Response(srz_data.data, status=status.HTTP_200_OK)

class GetUserView(APIView):
    def dispatch(self, request, *args, **kwargs):
        if request.headers.get('Authorization'):
            print(request.headers.get('Authorization'))
            return super().dispatch(request)
        return JsonResponse({"message":"not authenticated"}, status=403)

    def get(self, request):
        token = request.headers.get('Authorization')
        token = token.split(' ')[1]
        user = decode_jwt(token)
        user = User.objects.get(id=user['user_id'])
        srz_data = UserListSerializer(instance=user)
        return Response(srz_data.data)




def decode_jwt(token):
    try:
        decode = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )

        return decode
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return 1


