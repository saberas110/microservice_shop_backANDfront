from django.db import models
from django.db.models import Model


class Category(models.Model):
    name = models.CharField(max_length=40)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name



class Product(models.Model):
    title = models.CharField(max_length=100, default='')
    name = models.CharField()
    category = models.ManyToManyField(Category, related_name='products', null=True, blank=True)
    ram = models.ForeignKey("Rom", on_delete=models.CASCADE, related_name='properties', null=True, blank=True)
    cpu = models.ForeignKey("Cpu", on_delete=models.CASCADE, related_name='properties', null=True, blank=True)
    memory = models.ForeignKey("Memory", on_delete=models.CASCADE, related_name='properties', null=True, blank=True)

    def __str__(self):
        return f'{self.name}--{getattr(self.cpu, "name", "No CPU")}--{getattr(self.memory, "name", "No Memory")}'


class Property(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name='properties')
    color_name = models.CharField(max_length=20)
    color_code = models.CharField(max_length=15)
    price = models.PositiveIntegerField()
    available_quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.product.name}--{self.color_name}--{self.product.ram}--{self.product.memory}'


class Rom(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Cpu(models.Model):
    name = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.name


class Memory(models.Model):
    name = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.name



class Comment(models.Model):
    text = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    user = models.CharField(max_length=5)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.text[:5]

class LikeDisLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    user = models.CharField(max_length=5)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)



class ProductImages(models.Model):
    image = models.ImageField(upload_to='image/productImage', null=True, blank=True)
    product = models.ManyToManyField(Product, related_name='images')

    def __str__(self):
        first_product = self.product.first()
        return first_product.name if first_product else "No Product"

