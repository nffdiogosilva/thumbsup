from knox.views import LogoutView
from rest_framework import routers

from django.urls import path, include

from thumbnailer.views import ThumbnailViewSet
from .views import RegistrationAPI, LoginAPI, UserAPI


router = routers.DefaultRouter()
router.register(r'thumbnails', ThumbnailViewSet, r'thumbnails')

urlpatterns = [
    # Auth Endpoints
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/register/', RegistrationAPI.as_view(), name='register'),
    
    # Apps Endpoints (Thumbnail and others)
    path('', include(router.urls)),
]
