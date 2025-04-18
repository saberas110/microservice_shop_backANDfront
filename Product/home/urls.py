from django.urls import path
from home import views


urlpatterns = [
    path('add', views.ProductAddView.as_view()),
    path('list', views.ProductListView.as_view()),
    path('user', views.GetUserView.as_view()),
    path('comment', views.CommentView.as_view()),
]