from rest_framework import serializers

from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class CreateUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        del validated_data["confirm_password"]
        user = User.objects.create_user(validated_data['username'],
                                        email=validated_data['email'],
                                        password=validated_data['password'])
        return user

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', )


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
