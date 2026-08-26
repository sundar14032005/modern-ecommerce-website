from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class EmailOrUsernameTokenObtainPairSerializer(
    TokenObtainPairSerializer
):
    """
    Allows login using either username or email.
    """

    def validate(self, attrs):
        login = attrs.get(self.username_field)

        if login:
            login = login.strip()

            if "@" in login:
                try:
                    user = User.objects.get(
                        email__iexact=login
                    )
                    attrs[self.username_field] = user.username
                except User.DoesNotExist:
                    pass

        return super().validate(attrs)


class EmailOrUsernameTokenObtainPairView(
    TokenObtainPairView
):
    serializer_class = EmailOrUsernameTokenObtainPairSerializer