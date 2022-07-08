from django.contrib.auth.models import User
from django.db import models
from djongo.models import ArrayReferenceField


class Post(models.Model):
    title = models.CharField()
    description = models.TextField()
    price = models.PositiveIntegerField()
    isBuyRequest = models.BooleanField(default=False)


class UserDetail(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='detail',
    )
    phone_number = models.CharField()
    friends = ArrayReferenceField(
        to=User,
        on_delete=models.CASCADE,
    )
    posts = ArrayReferenceField(
        to=Post,
        on_delete=models.CASCADE,
    )
