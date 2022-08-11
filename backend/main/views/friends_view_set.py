from rest_framework import mixins
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from main.models import User
from main.models.friendship import Friendship
from main.serializers.user_serializers import UserSerializer


class FriendsViewSet(GenericViewSet, mixins.ListModelMixin):
    SELF_USER_ID = "self"

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        if user_id == self.SELF_USER_ID:
            user_id = self.request.user.id
        elif not Friendship.are_friends(self.request.user.id, user_id):
            raise ValidationError("برای مشاهده‌ی دوستان این کاربر باید با او دوست باشید!")
        friend_ids1 = list(Friendship.objects.filter(user1_id=user_id).values_list('user2', flat=True))
        friend_ids2 = list(Friendship.objects.filter(user2_id=user_id).values_list('user1', flat=True))
        friend_ids = friend_ids1 + friend_ids2
        friends = User.objects.filter(pk__in=friend_ids)
        return friends
