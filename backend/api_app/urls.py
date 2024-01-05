from django.urls import path
from .views import Bases


urlpatterns = [
    path("", Bases.as_view(), name='bases')
]