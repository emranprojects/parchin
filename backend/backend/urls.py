"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from main.views.friend_request_view import FriendRequestViewSet
from main.views.login_view_set import LoginViewSet
from main.views.user_view_set import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="users")
router.register(r'login', LoginViewSet, basename="login")
router.register(r'friend-request', FriendRequestViewSet, basename="friend-request")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
