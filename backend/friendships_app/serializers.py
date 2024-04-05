from rest_framework import serializers
from .models import Friendships
# from user_app.serializers import UserSerializer, User


class FriendshipSerializer(serializers.ModelSerializer):

    user_name = serializers.SerializerMethodField(source='user.name')

    class Meta:
        model = Friendships
        fields = ['id', 'user', 'user_name', 'friend', 'created_at']

    def get_user_name(self, obj):
        return obj.user.name 