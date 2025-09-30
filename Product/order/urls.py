from django.urls import path

from order import views

urlpatterns = [
    path('add', views.OrderView.as_view())
]