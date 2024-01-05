from django.urls import path
from .views import Sign_up, Log_in, User_info, Log_out, BaseChoicesView, All_users, Users_bybase

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('info/', User_info.as_view(), name='info'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('basechoices/', BaseChoicesView.as_view(), name='base-choices'),
    path('allusers/', All_users.as_view(), name='allusers'),
    path('filter/<str:base>/', Users_bybase.as_view(), name='usersbybase')
]