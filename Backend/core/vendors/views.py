from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Vendor
from .serializers import VendorSerializer

class VendorViewSet(viewsets.ReadOnlyModelViewSet):
    # BUG 5 fix: explicitly public — anyone can browse vendor pages without logging in.
    permission_classes = [AllowAny]
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer