from django.shortcuts import get_object_or_404
from .models import Friendships
from .serializers import FriendshipSerializer
from user_app.models import User
from user_app.views import UserPermissions
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

class Friendship_manager(UserPermissions):

    def post(self, request, friend_user_id):
        user = request.user
        friend = User.objects.get(id=friend_user_id)
        if user.friends.filter(id=friend_user_id).exists():
             return Response({"message": "Users are already friends."}, status=HTTP_400_BAD_REQUEST)
        if user.id == friend_user_id:
             return Response({"message": "You cannot add yourself as a friend"}, status=HTTP_400_BAD_REQUEST)
        print(user.id)
        
        friend_request, created = Friendships.objects.get_or_create(user=user, friend=friend)

        if created:
            return Response({"detail": f"friend request sent {user.name}, {friend.name}"},status=HTTP_201_CREATED)
        else:
            return Response({"detail": "Error sending request"},status=HTTP_400_BAD_REQUEST)

class Accept_request(UserPermissions):    
    def post(self, request, requesterId):
        
            friend_request = Friendships.objects.get(user=requesterId, friend=request.user)

            if friend_request.friend == request.user:
                 friend_request.user.friends.add(friend_request.friend)
                 friend_request.friend.friends.add(friend_request.user)
                 friend_request.delete()

                 return Response({"message": f"{friend_request.user.name} and {friend_request.friend.name} are now friends!"}, status=HTTP_201_CREATED)

            else:
                 return Response({"message":"Error accepting request"}, status=HTTP_400_BAD_REQUEST)
            

class Get_friend_requests(UserPermissions):
     def get(self, request):
            user = request.user
            
            friend_requests = Friendships.objects.filter(friend=user)

            ser_requests = FriendshipSerializer(friend_requests, many=True)

            

            return Response(ser_requests.data, status=HTTP_200_OK)
     

class Delete_friend(UserPermissions):
     def delete(self, request, user_name):
          
          print(user_name)
          
          friend_to_delete = User.objects.get(name=user_name)
          user =request.user

          if friend_to_delete:
               user.friends.remove(friend_to_delete)        
               return Response({"message": "You are no longer friends"}, status=HTTP_200_OK)
          else:
               return Response({"message": "friend not found"}, status=HTTP_400_BAD_REQUEST)
          

      
