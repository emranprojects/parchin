from django.db import IntegrityError, transaction
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from main.models.friend_request import FriendRequest
from main.models.friendship import Friendship
from main.serializers.friend_request_serializers import FriendRequestPreviewSerializer, FriendRequestSerializer
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
            else:
                raise e

    @action(['GET'], detail=False, url_path="previews")
    def get_friend_request_previews(self, request: Request):
        friend_requests = self.get_queryset().all()
        serializer = FriendRequestPreviewSerializer(friend_requests, many=True)
        return Response(serializer.data)

    @action(['POST'], detail=True, url_path="accept")
    def accept_friend_request(self, request: Request, pk: int):
        friend_request = FriendRequest.objects.get(id=pk)
        if friend_request.target != request.user:
            raise ValidationError("درخواست دوستی برای شما نیست!")
        with transaction.atomic():
            Friendship.objects.create(user1_id=friend_request.requester_id,
                                      user2_id=friend_request.target_id)
            friend_request.delete()
        return Response()

    @action(['POST'], detail=True, url_path="reject")
    def reject_friend_request(self, request: Request, pk: int):
        friend_request = FriendRequest.objects.get(id=pk)
        if friend_request.target != request.user:
            raise ValidationError("درخواست دوستی برای شما نیست!")
        friend_request.delete()
        return Response()
