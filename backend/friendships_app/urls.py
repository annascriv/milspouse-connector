from django.urls import path
from .views import Friendship_manager, Accept_request

urlpatterns = [
    path('friend-request/<int:friend_user_id>/', Friendship_manager.as_view(), name='friendrequest'),
    path('request-approval/<int:requestId>/', Accept_request.as_view(), name='approvedrequest')
]