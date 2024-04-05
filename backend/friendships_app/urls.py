from django.urls import path
from .views import Friendship_manager, Accept_request, Get_friend_requests, Delete_friend

urlpatterns = [
    path('friend-request/<int:friend_user_id>/', Friendship_manager.as_view(), name='friendrequest'),
    path('request-approval/<int:requesterId>/', Accept_request.as_view(), name='approvedrequest'),
    path('all-requests/', Get_friend_requests.as_view(), name='friendrequests'),
    path('delete-friend/<str:user_name>/', Delete_friend.as_view(), name='deletefriend')
]