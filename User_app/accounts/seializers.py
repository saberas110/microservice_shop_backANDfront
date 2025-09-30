from datetime import datetime, timedelta
from xml.dom import ValidationErr

from rest_framework import serializers
from .models import User, Otp, AddressModel


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    otp_code = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['phone_number', 'password', 'password2', 'otp_code']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def create(self, validated_data):
        del validated_data['password2']
        del validated_data['otp_code']
        return User.objects.create_user(**validated_data)

    def validate(self,data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('passwords not match')
        try:
            otp_code = Otp.objects.get(phone_number=data['phone_number'])
            if otp_code.code != data['otp_code']:
                raise serializers.ValidationError('this code is not mathing with otp code')
            return data
        except Otp.DoesNotExist:
            raise serializers.ValidationError('this code is not exist')

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressModel
        fields = '__all__'
