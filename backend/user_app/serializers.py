from .models import User
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "age", "base", "number_of_kids", "dogs", "bio"]
