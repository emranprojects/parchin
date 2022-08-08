from django.db import IntegrityError
from django.test import TestCase

from main.models import User
from main.models.friendship import Friendship


class FriendshipTest(TestCase):
    def setUp(self) -> None:
        self.user1 = User.objects.create(phone_number='+989123456789')
        self.user2 = User.objects.create(phone_number='+989987654321')

    def test_duplicate_friendship_should_not_create_even_with_swapped_user1_and_user2(self):
        Friendship.objects.create(user1=self.user1, user2=self.user2)
        with self.assertRaises(IntegrityError):
            Friendship.objects.create(user1=self.user2, user2=self.user1)

    def test_can_tell_two_users_are_friends(self):
        self.assertFalse(Friendship.are_friends(self.user1.id, self.user2.id))
        Friendship.objects.create(user1=self.user1, user2=self.user2)
        self.assertTrue(Friendship.are_friends(self.user1.id, self.user2.id))

    def test_can_tell_two_users_are_friends_even_if_swapped(self):
        self.assertFalse(Friendship.are_friends(self.user1.id, self.user2.id))
        Friendship.objects.create(user1=self.user1, user2=self.user2)
        self.assertTrue(Friendship.are_friends(self.user2.id, self.user1.id))
