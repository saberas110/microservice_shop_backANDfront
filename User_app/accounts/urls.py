from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register',views.UserRegisterView.as_view()),
    path('otp', views.RegisterOtpView.as_view()),
    path('user/list', views.UserListView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('get/user', views.GetUserView.as_view()),

]