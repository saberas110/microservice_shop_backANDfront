from django.db import models
from django.contrib.auth.models import AbstractBaseUser,AbstractUser
from django.forms import DateTimeField
from .managers import UserManager
import uuid


class User(AbstractBaseUser):
    phone_number = models.CharField(unique=True, max_length=11)
    first_name = models.CharField(max_length=50,null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default = False)
    # date_joined = DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['email']
    objects = UserManager()

    def has_perm(self,perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        return f'{self.phone_number}'

class Otp(models.Model):
    phone_number = models.CharField(max_length=11)
    code = models.CharField(max_length=4)
    create_at = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()

    def __str__(self):
        return f'{self.phone_number}-{self.code}'

class AddressModel(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='addresses',null=True)
    address = models.CharField(max_length=300)
    receiver_phone = models.CharField(max_length=12)
    province = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    plaque = models.CharField(max_length=10)
    postcode = models.CharField(max_length=10)
    unit = models.CharField(max_length=10, null=True, blank=True)
    isSelected = models.BooleanField(default=False)

    def __str__(self):
        return self.address

