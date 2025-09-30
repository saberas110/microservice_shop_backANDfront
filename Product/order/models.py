from django.db import models

from home.models import Product


class OrderModel(models.Model):
    user = models.CharField(max_length=11)
    address = models.JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    total_price = models.IntegerField(default=0)

    def __str__(self):
        return self.user

class OrderItemModel(models.Model):
    order = models.ForeignKey(OrderModel,on_delete=models.CASCADE,related_name='items',null=True,blank=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='items')
    color = models.CharField(max_length=12)
    price = models.PositiveIntegerField(default=0)
    quantity = models.SmallIntegerField(default=0)

    class Meta:
        unique_together = ('order', 'product', 'color')

    def __str__(self):
        return self.product.name