from django.urls import path
from .views import Bases, Base_by_name


urlpatterns = [
    path("", Bases.as_view(), name='bases'),
    path("<str:base>/", Base_by_name.as_view(), name='base-search')
]