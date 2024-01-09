from .models import User
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "name", "age", "base", "number_of_kids", "dogs", "bio", "profile_picture"]
