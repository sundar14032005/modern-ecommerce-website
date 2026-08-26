from django.urls import path

from .views import RegisterView, MeView, LogoutView
from .token_views import (
    EmailOrUsernameTokenObtainPairView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "login/",
        EmailOrUsernameTokenObtainPairView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),

    # BUG 6 fix: server-side logout that blacklists the refresh token.
    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),

    path(
        "me/",
        MeView.as_view(),
        name="me",
    ),
]