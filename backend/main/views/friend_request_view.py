from django.db import IntegrityError
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from main.models.friend_request import FriendRequest
from main.serializers.friend_request_serializers import FriendRequestSerializer
from main.utils import integrity_error_utils
from main.utils.integrity_error_utils import IntegrityErrorType


class FriendRequestViewSet(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FriendRequest.objects.filter(Q(requester=self.request.user) | Q(target=self.request.user))

    def perform_create(self, serializer):
        try:
            serializer.save(requester=self.request.user, target_id=self.request.data['target_id'])
        except IntegrityError as e:
            if integrity_error_utils.get_error_type(e) == IntegrityErrorType.UNIQUE_CONSTRAINT:
                raise ValidationError("درخواست دوستی قبلا ارسال شده است!")
