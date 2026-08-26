from django.db import models
from vendors.models import Vendor

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    banner = models.URLField(blank=True)

    def __str__(self):
        
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='products')
    images = models.JSONField(default=list)  # Array of image URLs
    tags = models.JSONField(default=list, blank=True)
    attributes = models.JSONField(default=dict, blank=True)
    stock = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title