from .models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from friendships_app.serializers import FriendshipSerializer


class UserSerializer(ModelSerializer):

    friends = serializers.SerializerMethodField()


    class Meta:
        model = User
        fields = ["id","email", "name", "age", "base", "number_of_kids", "dogs", "bio", "profile_picture", "friends"]

    def get_friends(self, obj):
        
        if obj.friends:
            return obj.friends.count()
        return 0

