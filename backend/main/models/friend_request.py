from django.db import models
from rest_framework.exceptions import ValidationError

from main.models.friendship import Friendship
from main.models.user import User


class FriendRequest(models.Model):
    requester = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='+')
    target = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='+')

    class Meta:
        unique_together = ('requester', 'target')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if Friendship.are_friends(self.requester_id, self.target_id):
            raise ValidationError("در حال حاضر دوست هستید!")
        super().save(force_insert, force_update, using, update_fields)
