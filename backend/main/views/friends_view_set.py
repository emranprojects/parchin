from django.db.models import Q
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from main.models import User
from main.models.friendship import Friendship
from main.serializers.user_serializers import UserSerializer


class FriendsViewSet(GenericViewSet, mixins.ListModelMixin):
    SELF_USER_ID = "self"

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @property
    def subject_user_id(self) -> int:
        i = self.kwargs['user_id']
        if i == self.SELF_USER_ID:
            i = self.request.user.id
        return i

    def get_queryset(self):
        if not Friendship.are_friends(self.request.user.id, self.subject_user_id):
            raise ValidationError("برای مشاهده‌ی دوستان این کاربر باید با او دوست باشید!")
        friend_ids1 = list(Friendship.objects.filter(user1_id=self.subject_user_id).values_list('user2', flat=True))
        friend_ids2 = list(Friendship.objects.filter(user2_id=self.subject_user_id).values_list('user1', flat=True))
        friend_ids = friend_ids1 + friend_ids2
        friends = User.objects.filter(pk__in=friend_ids)
        return friends

    @action(['POST'], detail=True, url_path="remove")
    def remove_friend(self, request: Request, user_id: str, pk: int):
        if user_id != "self":
            raise ValidationError("فقط دوستان خود را می‌توانید حذف کنید!")

        friendship = Friendship.objects.filter(Q(user1_id=request.user.id, user2_id=pk)
                                               | Q(user1_id=pk, user2_id=request.user.id)).get()
        friendship.delete()
        return Response()
