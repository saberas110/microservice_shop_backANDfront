from django.urls import path
from home import views


urlpatterns = [
    path('add', views.ProductAddView.as_view()),
    path('list', views.ProductListView.as_view()),
    path('<int:pk>', views.ProductView.as_view()),
    path('csrf', views.CSRFTokenView.as_view()),
    path('search/', views.Search.as_view()),
    path('user', views.GetUserView.as_view()),
    path('comment', views.CommentView.as_view()),
]