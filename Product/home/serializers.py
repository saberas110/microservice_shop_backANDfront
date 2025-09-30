from rest_framework import serializers
from .models import Product, Comment, ProductImages, Property


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'


class CommenstSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True)
    comments = CommenstSerializer(many=True, read_only=True)
    properties = PropertySerializer(many=True, read_only=True)
    ram = serializers.StringRelatedField()
    memory = serializers.StringRelatedField()
    cpu = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['name', 'title', 'images', 'id', 'comments', 'properties', 'ram', 'memory', 'cpu']

        def get_url_image(self, obj):
            request = self.context.request.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url


class QuickProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validate_data):
        user = self.context['user_id']
        return Comment.objects.create(user=user, **validate_data)
