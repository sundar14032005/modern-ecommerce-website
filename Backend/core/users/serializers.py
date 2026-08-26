from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]
        read_only_fields = ["id"]

    def validate_email(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Email address is required."
            )

        user = self.instance

        queryset = User.objects.filter(email__iexact=value)

        if user:
            queryset = queryset.exclude(pk=user.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )

    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2",
            "first_name",
            "last_name",
        ]

    def validate_username(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with this username already exists."
            )

        return value

    def validate_email(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Email address is required."
            )

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({
                "password2": "Passwords do not match."
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        return user