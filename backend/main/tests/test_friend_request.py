from django.test import TestCase
from rest_framework.exceptions import ValidationError

from main.models import User, FriendRequest
from main.models.friendship import Friendship


class FriendRequestTest(TestCase):
    def setUp(self) -> None:
        self.user1 = User.objects.create(phone_number='+989123456789')
        self.user2 = User.objects.create(phone_number='+989987654321')

    def test_cant_send_friend_request_to_friend(self):
        Friendship.objects.create(user1=self.user1, user2=self.user2)
        with self.assertRaises(ValidationError):
            FriendRequest.objects.create(requester=self.user1, target=self.user2)
