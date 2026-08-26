from rest_framework import serializers
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    # React expects a 'count' field
    count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description', 'banner', 'count']

    def get_count(self, obj):
        return obj.products.count()


class ProductSerializer(serializers.ModelSerializer):
    # Map Django snake_case / FK-by-id fields to what the React frontend expects
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)
    vendor_id = serializers.IntegerField(source='vendor.id', read_only=True)
    category_slug = serializers.SlugField(source='category.slug', read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'slug', 'description', 'price', 'original_price',
            'category', 'category_slug', 'vendor', 'vendor_id', 'vendor_name',
            'images', 'tags', 'attributes', 'stock',
            'rating', 'reviews_count', 'is_featured', 'is_new', 'created_at'
        ]
