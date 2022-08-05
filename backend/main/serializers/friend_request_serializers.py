from rest_framework import serializers

from main.models.friend_request import FriendRequest
from main.serializers.utils import ReadOnlyModelSerializer


class FriendRequestSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
