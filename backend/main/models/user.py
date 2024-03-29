from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone_number = models.CharField(max_length=len("+989120001122"), unique=True)
    first_name = models.CharField(null=False, blank=True, default='', max_length=64)
    last_name = models.CharField(null=False, blank=True, default='', max_length=64)

    def save(self, *args, **kwargs):
        # Django users should have unique usernames
        self.username = self.phone_number
        super().save(*args, **kwargs)
