from rest_framework import serializers
from .models import Product, Comment


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields ='__all__'
        read_only_fields = ['user']
    def create(self,validate_data):
        user = self.context['user_id']
        return Comment.objects.create(user=user, **validate_data)

