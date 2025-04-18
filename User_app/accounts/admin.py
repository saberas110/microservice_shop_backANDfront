from django.contrib import admin

from accounts.models import User, Otp

admin.site.register(User)
admin.site.register(Otp)