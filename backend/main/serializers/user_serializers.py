from rest_framework import serializers

from main.models.user import User


class UserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'phone_number']


class UserPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']
