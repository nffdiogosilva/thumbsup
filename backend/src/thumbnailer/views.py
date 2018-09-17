
from rest_framework import viewsets, permissions, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from knox.auth import TokenAuthentication
from knox.models import AuthToken

from django.contrib.auth.signals import user_logged_out

from .models import Thumbnail
from .serializers import ThumbnailSerializer


class ThumbnailViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows thumbnails to be viewed or edited.
    """
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ThumbnailSerializer

    def get_queryset(self):
        return self.request.user.thumbnails.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
