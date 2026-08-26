from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
    """
    Register a new user and immediately return
    JWT access and refresh tokens.
    """

    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    """
    BUG 6 fix: Blacklist the submitted refresh token so it cannot be used
    again, even if stolen. Requires rest_framework_simplejwt.token_blacklist
    in INSTALLED_APPS and BLACKLIST_AFTER_ROTATION = True in SIMPLE_JWT.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            # Token is already expired or invalid — treat as already logged out.
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(APIView):
    """
    Get or update the currently authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)