from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_id', 'product_title', 'quantity', 'price', 'vendor_name']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)  # Accept nested items

    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'address', 'city', 'state', 'zip_code',
            'subtotal', 'discount_amount', 'shipping_fee', 'tax', 'total',
            'promo_code', 'items', 'status', 'created_at'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)  # ← SAVES TO MYSQL!
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order