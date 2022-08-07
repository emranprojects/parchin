from main.models.friend_request import FriendRequest
from main.serializers.user_serializers import UserSerializer
from main.serializers.utils import ReadOnlyModelSerializer


class FriendRequestPreviewSerializer(ReadOnlyModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'


class FriendRequestSerializer(ReadOnlyModelSerializer):
    requester = UserSerializer()
    target = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = '__all__'
