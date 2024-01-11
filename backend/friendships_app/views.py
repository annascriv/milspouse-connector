from django.shortcuts import get_object_or_404
from .models import Friendships
from user_app.models import User
from user_app.views import UserPermissions
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

class Friendship_manager(UserPermissions):

    def post(self, request, friend_user_id):
        user = request.user
        friend = User.objects.get(id=friend_user_id)
        print(user.id)
        friend_request, created = Friendships.objects.get_or_create(user=user, friend=friend)

        
        if created:
            return Response({"detail": f"friend request sent {user.name}, {friend.name}"},status=HTTP_201_CREATED)
        else:
            return Response({"detail": "Error sending request"},status=HTTP_400_BAD_REQUEST)

class Accept_request(UserPermissions):    
    def post(self, request, requestId):
        
            friend_request = Friendships.objects.get(id=requestId)

            if friend_request.user == request.user:
                 friend_request.user.friends.add(friend_request.friend)
                 friend_request.friend.friends.add(friend_request.user)
                 friend_request.delete()

                 return Response({"message": f"{friend_request.user.name} and {friend_request.friend.name} are now friends!"}, status=HTTP_201_CREATED)

            else:
                 return Response({"message":"Error accepting request"}, status=HTTP_400_BAD_REQUEST)