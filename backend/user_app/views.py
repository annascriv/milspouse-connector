from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404

from .models import User
from .serializers import UserSerializer
from friendships_app.serializers import Friendships, FriendshipSerializer

# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data["username"] = request.data["email"]
            new_user = User.objects.create_user(**data)
            new_token = Token.objects.create(user = new_user)

            return Response({"email": new_user.email, "token":new_token.key}, status=HTTP_201_CREATED)
        
        except Exception as e:
            return Response("Something went wrong creating a user", status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
            user = authenticate(username=email, password=password)

            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"email":user.email, "token":token.key})
            return Response("Something went wrong creating a token")
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class User_info(UserPermissions):
    def get(self, request):
        user = UserSerializer(request.user)

        # friendships = Friendships.objects.filter(user=user)
        # friends = [friendship.friend for friendship in friendships]
        return Response(user.data)
    
    def put(self, request):
        user = request.user

        try:
            updated_user = UserSerializer(instance=user, data=request.data, partial=True)

            if updated_user.is_valid():
                updated_user.save()

            return Response(HTTP_204_NO_CONTENT)
        except Exception as e:
            print("error updating", e)
            return Response(HTTP_400_BAD_REQUEST)
        
class Log_out(UserPermissions):
    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(HTTP_204_NO_CONTENT)
        except Exception as e:
            return("Error logging out")
        

class BaseChoicesView(APIView):
    def get(self, request, *args, **kwargs):
        base_choices = User.BASE_CHOICES
        return Response(base_choices, status=HTTP_204_NO_CONTENT)
    

class All_users(UserPermissions):
    def get(self, request):
        users = User.objects.all()
        ser_users = UserSerializer(users, many=True)

        return Response(ser_users.data)
    

class Users_bybase(UserPermissions):
    def get(self, request, base):
        users = User.objects.filter(base=base)
        ser_users = UserSerializer(users, many=True)

        return Response(ser_users.data)
    


