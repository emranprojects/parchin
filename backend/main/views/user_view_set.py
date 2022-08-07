from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from main.models import User
from main.serializers.user_serializers import UserPreviewSerializer


class UserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin):
    serializer_class = UserPreviewSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
