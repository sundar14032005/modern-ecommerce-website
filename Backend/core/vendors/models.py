from django.db import models

class Vendor(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    logo = models.URLField(blank=True)
    banner = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    sales_count = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=100, blank=True)
    join_date = models.CharField(max_length=50, blank=True)
    verified = models.BooleanField(default=False)
    response_rate = models.CharField(max_length=20, blank=True)
    badges = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name