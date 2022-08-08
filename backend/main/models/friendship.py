from django.db import models

from main.models.user import User


class Friendship(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')

    class Meta:
        unique_together = ('user1', 'user2')

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        is_creating_new = not self.pk
        if is_creating_new:
            if self.user1_id > self.user2_id:
                # user1 and user2 ids should always be sorted to prevent duplications, through unique_together
                # constraint defined in the Friendship model.
                self.user1_id, self.user2_id = self.user2_id, self.user1_id
        super().save(force_insert, force_update, using, update_fields)

    @staticmethod
    def are_friends(left_id, right_id) -> bool:
        left_id = int(left_id)
        right_id = int(right_id)
        if left_id == right_id:
            return True
        id1 = min(left_id, right_id)
        id2 = max(left_id, right_id)
        return Friendship.objects.filter(user1_id=id1, user2_id=id2).exists()
