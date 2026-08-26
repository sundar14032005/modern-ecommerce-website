from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    """Receives order data from React and saves it to the database.

    Works for both guest checkout and logged-in checkout: if a valid JWT is
    sent, the order is linked to that user; otherwise it's saved as a guest
    order using just the contact details from the form.
    """
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user if request.user.is_authenticated else None
        order = serializer.save(user=user)
        return Response({
            'success': True,
            'order_id': order.id,
            'message': 'Order placed successfully!'
        }, status=status.HTTP_201_CREATED)

    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


class MyOrdersView(generics.ListAPIView):
    """Order history for the logged-in user."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
