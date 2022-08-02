from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from main.serializers.user_serializers import UserSerializer


class UserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(methods=['GET', 'PUT', 'DELETE'], detail=False, url_path="self")
    def self_user_endpoint(self, request, *args, **kwargs):
        if request.method == "GET":
            return self._get_current_user(request, *args, **kwargs)
        elif request.method == "PUT":
            return self._update_current_user(request, *args, **kwargs)
        elif request.method == "DELETE":
            return self._delete_current_user(request, *args, **kwargs)
        else:
            raise ValueError(f"Unexpected method: {request.method}")

    @staticmethod
    def _get_current_user(request, *args, **kwargs):
        serializer = UserSerializer(instance=request.user, context={"request": request})
        return Response(serializer.data)

    @staticmethod
    def _update_current_user(request, *args, **kwargs):
        user_serializer = UserSerializer(request.user, request.data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()
        return Response(status=HTTP_200_OK)

    @staticmethod
    def _delete_current_user(request, *args, **kwargs):
        request.user.delete()
        return Response(status=HTTP_200_OK)
