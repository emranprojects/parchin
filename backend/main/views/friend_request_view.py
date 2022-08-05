from django.db import IntegrityError
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from main.models.friend_request import FriendRequest
from main.serializers.friend_request_serializers import FriendRequestSerializer
from main.utils import integrity_error_utils
from main.utils.integrity_error_utils import IntegrityErrorType


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(requester=self.request.user, target_id=self.request.data['target_id'])
        except IntegrityError as e:
            if integrity_error_utils.get_error_type(e) == IntegrityErrorType.UNIQUE_CONSTRAINT:
                raise ValidationError("درخواست دوستی قبلا ارسال شده است!")
