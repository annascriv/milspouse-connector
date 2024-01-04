from django.urls import path
from .views import Sign_up, Log_in, User_info, Log_out

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('info/', User_info.as_view(), name='info'),
    path('logout/', Log_out.as_view(), name='logout')
]