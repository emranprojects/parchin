import logging
import random

from django.conf import settings
from django.core.cache import caches
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_200_OK

from main import utils
from main.models.user import User
from main.serializers.auth_code_serializers import AuthCodeRequestSerializer, AuthCodeSubmitMessageSerializer


class LoginViewSet(viewsets.ViewSet):
    permission_classes = []

    @action(methods=['POST'], detail=False, url_path="request-code", permission_classes=[])
    def request_code(self, request, *args, **kwargs):
        serializer = AuthCodeRequestSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        auth_code = str(random.randrange(10_000, 100_000))
        utils.send_sms(serializer.data['phone_number'], auth_code)
        caches[settings.CACHE_NAME_AUTH_CODES].set(serializer.data['phone_number'], auth_code)
        return Response(status=HTTP_202_ACCEPTED)

    @action(methods=['POST'], detail=False, url_path="submit-code", permission_classes=[])
    def submit_code(self, request, *args, **kwargs):
        serializer = AuthCodeSubmitMessageSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        received_auth_code = serializer.data['auth_code']
        actual_auth_code = caches[settings.CACHE_NAME_AUTH_CODES].get(serializer.data['phone_number'])
        logging.debug(f"Phone number ({serializer.data['phone_number']}) auth code:"
                      f" Received={received_auth_code} Actual={actual_auth_code}")
        if received_auth_code != actual_auth_code:
            raise ValidationError("Invalid auth code!", code=HTTP_400_BAD_REQUEST)
        user, user_newly_created = User.objects.get_or_create(phone_number=serializer.data['phone_number'])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "id": user.id},
                        status=HTTP_201_CREATED if user_newly_created else HTTP_200_OK)
