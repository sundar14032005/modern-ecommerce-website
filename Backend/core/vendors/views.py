from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Vendor
from .serializers import VendorSerializer


class VendorViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Vendor.objects.all().order_by("id")
    serializer_class = VendorSerializer