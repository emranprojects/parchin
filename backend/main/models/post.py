from django.db import models

from main.models.user import User


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.TextField()
    price = models.PositiveIntegerField()
    isBuyRequest = models.BooleanField(default=False)
