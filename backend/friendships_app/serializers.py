from rest_framework import serializers
from .models import Friendships


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendships
        fields = ['id', 'user', 'friend', 'created_at']