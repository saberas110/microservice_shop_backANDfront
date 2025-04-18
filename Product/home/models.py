from email.policy import default

from django.db import models
from django.db.models import Model


class Product(models.Model):
    name = models.CharField()
    price = models.PositiveIntegerField()
    color = models.ManyToManyField('Color', related_name='products')

    def __str__(self):
        return self.name

class Color(models.Model):
    name = models.CharField(max_length=20)
    color_code = models.CharField(max_length=15)
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

