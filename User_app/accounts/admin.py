from django.contrib import admin

from accounts.models import User, Otp, AddressModel

admin.site.register(User)
admin.site.register(Otp)
admin.site.register(AddressModel)
