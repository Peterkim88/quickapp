from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders_add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('<str:pk>/', views.getOrderById, name='user_order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='order_pay')
]