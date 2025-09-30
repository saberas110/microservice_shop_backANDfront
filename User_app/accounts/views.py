import datetime
from multiprocessing.connection import address_type
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .seializers import UserRegisterSerializer, UserListSerializer, AddressSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Otp, User, AddressModel
from random import randint
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie


class CSRFTokenView(APIView):
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return Response({'message':'CSRF cookie set'})


class RegisterOtpView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        random_code = randint(1000, 9999)
        try:
            otp_code = Otp.objects.get(phone_number=phone_number)
            otp_code.delete()
        finally:
            otp_code = Otp.objects.create(phone_number=phone_number, code=random_code,
                                          expired_time=datetime.datetime.now() + datetime.timedelta(minutes=2))
            print(otp_code.code)
            return Response({'message': 'we sent otp_code to your phone_number'}, status=status.HTTP_200_OK)



class RegisterSetTokenView(APIView):
    def post(self, request):
        srz_data = UserRegisterSerializer(data=request.data)
        if srz_data.is_valid():
            user = srz_data.create(srz_data.validated_data)
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            data = dict(srz_data.data)
            data['user'] = {
            "id": user.id,
            "username": user.phone_number,
            "email": user.email
                }
            data['exp'] = access.get('exp')
            response = Response(data, status.HTTP_201_CREATED)
            response.set_cookie(
                key = 'access',
                value = str(access),
                httponly = True,
                secure = False,
                samesite = "lax",
                max_age = 3600
            )
            response.set_cookie(
                key = 'refresh',
                value = str(refresh),
                httponly = True,
                secure = False,
                samesite = "lax",
                max_age = 3600
            )
            return response
        return Response(srz_data.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self,request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        user = authenticate(phone_number=phone_number, password=password)
        if user is None :
            try :
                user = User.objects.get(phone_number=phone_number)
                return Response({'message':'رمز اشتباه است'},status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'message':'کابری با این شماره وجود ندارد'}, status.HTTP_404_NOT_FOUND)
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        response = Response({
            'user':{
                'id': user.id,
                'phone_number': user.phone_number,
                'email': user.email
            },
            'exp':access.get('exp')
        },status.HTTP_200_OK)
        response.set_cookie(
            key="access",
            value=str(access),
            httponly=True,
            secure=False,  # در پروDUCTION بذار True
            samesite="Lax",
            max_age=3600  # مثلا ۵ دقیقه
        )
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 7  # مثلا ۷ روز
        )
        return response

class UserListView(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAdminUser]
    def get(self, request):
        users = User.objects.all()
        srz_data = UserListSerializer(instance=users, many=True)
        return Response(srz_data.data, status=status.HTTP_200_OK)


class GetUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            token = request.COOKIES.get('access')
            user = request.user
            srz_data = UserListSerializer(user)
            return Response(srz_data.data)
        except Exception as e:
            print(f'saberjan error is {e}')
            return Response({'Exception': e})


class CheckLoginView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        access = AccessToken.for_user(user)
        return Response({
            'user':{
            "id": user.id,
            "username": user.phone_number,
            "email": user.email
                },
            'exp': access.get('exp')

        }, status=status.HTTP_200_OK)

class AddressView(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, pk=None):
        return get_object_or_404(AddressModel, pk=pk)

    def get(self,request):
        addresses = AddressModel.objects.filter(user=request.user).order_by('id')
        srz_data = AddressSerializer(addresses, many=True)
        return Response(srz_data.data, status=status.HTTP_200_OK)

    def post(self,request):
        data = request.data
        AddressModel.objects.create(**data, user=request.user)
        return Response ({'message:':'Address is Created'}, status.HTTP_201_CREATED)

    def patch(self, request, pk=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        AddressModel.objects.get(user=request.user, id=pk).delete()
        return Response({'message': 'address  deleted'}, status.HTTP_200_OK)

class SelectedAddressView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        AddressModel.objects.filter(user=request.user).exclude(id=pk).update(isSelected=False)
        AddressModel.objects.filter(user=request.user, id=pk).update(isSelected=True)
        return Response({'message':'is selected address is change'})



class Logout(APIView):
    def get(self, request):
        logout(request)
        return Response({'message':'logout Done'})

