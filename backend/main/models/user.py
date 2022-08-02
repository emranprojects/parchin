from django.contrib.auth.models import AbstractUser
from django.db import models
from djongo.models import ArrayReferenceField

from main.models.post import Post


class User(AbstractUser):
    phone_number = models.CharField(max_length=len("+989120001122"))
    first_name = models.CharField(null=False, blank=True, default='', max_length=64)
    last_name = models.CharField(null=False, blank=True, default='', max_length=64)
    friends = ArrayReferenceField(
        to="self",
        on_delete=models.CASCADE,
    )
    posts = ArrayReferenceField(
        to=Post,
        on_delete=models.CASCADE,
    )
