from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q, Count
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    # BUG 5 fix: explicitly public — anyone can browse products without logging in.
    permission_classes = [AllowAny]
    queryset = Product.objects.select_related('category', 'vendor').all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__slug', 'vendor__id', 'is_featured', 'is_new']
    search_fields = ['title', 'description', 'tags', 'vendor__name']
    ordering_fields = ['price', 'rating', 'created_at']
    ordering = ['-is_featured', '-created_at']

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        # Price range
        min_price = params.get('min_price')
        max_price = params.get('max_price')
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)

        # Minimum rating
        min_rating = params.get('min_rating')
        if min_rating:
            qs = qs.filter(rating__gte=min_rating)

        # In stock only
        if params.get('in_stock') == 'true':
            qs = qs.filter(stock__gt=0)

        # Exclude specific product (for "related products")
        exclude_id = params.get('exclude_id')
        if exclude_id:
            qs = qs.exclude(id=exclude_id)

        return qs

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        # Calculate facets for the current filtered queryset
        qs = self.get_queryset()
        facets = {
            'categories': dict(
                qs.values_list('category__slug').annotate(count=Count('id'))
            ),
            'vendors': dict(
                qs.values_list('vendor__id').annotate(count=Count('id'))
            ),
            'ratings': {
                '4.5': qs.filter(rating__gte=4.5).count(),
                '4.0': qs.filter(rating__gte=4.0).count(),
                '3.5': qs.filter(rating__gte=3.5).count(),
            }
        }
        response.data['facets'] = facets
        return response

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    # BUG 5 fix: explicitly public — anyone can see categories.
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'