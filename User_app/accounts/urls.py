from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register',views.RegisterSetTokenView.as_view()),
    path('csrf',views.CSRFTokenView.as_view()),
    path('getuser',views.GetUser.as_view()),

    path('otp', views.RegisterOtpView.as_view()),
    path('user/list', views.UserListView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('checklogin', views.CheckLoginView.as_view()),
    path('login', views.LoginView.as_view()),


]