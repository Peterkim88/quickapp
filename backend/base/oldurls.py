from django.urls import path, include
# from . import views

urlpatterns = [
    # path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('users/register/', views.registerUser, name='register_user'),
    # path('users/profile/', views.getUserProfile, name="user_profile"),
    # path('users/', views.getAllUsers, name="users_profile"),
    # # path('', views.getRoutes, name="routes"),
    # path('products/', views.getProducts, name="products"),
    # path('products/<str:pk>/', views.getProduct, name="product"),
    path('products/', include('urls.products_urls')),
    path('users/', include('urls.users_urls')),
    path('orders/', include('urls.orders_urls')),
]
