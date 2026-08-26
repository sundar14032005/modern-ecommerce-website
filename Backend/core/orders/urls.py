from django.urls import path
from .views import create_order, MyOrdersView

urlpatterns = [
    path('create/', create_order, name='create-order'),
    path('mine/', MyOrdersView.as_view(), name='my-orders'),
]
