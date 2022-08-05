from django.db import models

from main.models.user import User


class FriendRequest(models.Model):
    requester = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='+')
    target = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='+')

    class Meta:
        unique_together = ('requester', 'target')
