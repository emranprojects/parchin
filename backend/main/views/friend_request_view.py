from django.db import IntegrityError
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

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

    @action(['GET'], detail=False, url_path=r"has-pending-request/(?P<target_id>\w+)")
    def active_friend_request_exists(self, request: Request, target_id, *args, **kwargs):
        active_friend_request_exists = FriendRequest.objects.filter(requester=request.user) \
            .filter(target_id=target_id).exists()
        return Response(active_friend_request_exists)
