from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from user_app.views import UserPermissions

# Create your views here.

class Bases(UserPermissions):
    def get(self, request):
        endpoint = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/military-bases/records?select=geo_point_2d%2C%20component%2C%20site_name%2C%20state_terr%2C%20country&refine=component%3A%22AF%20Active%22&limit=100"

        response = requests.get(endpoint)

        responseJSON = response.json()

        return Response(responseJSON)
    
class Base_by_name(UserPermissions):
    def get(self, request, base):

        
        
        endpoint=f"https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/military-bases/records?select=site_name%2C%20state_terr%2C%20country&where=site_name%3D%27{base}%27&limit=20&refine=component%3A%22AF%20Active%22"

        # endpoint=f"https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/military-bases/records?select=site_name%2C%20state_terr%2C%20country&where=site_name%3D%27{base}%20AFB%27&limit=20&refine=component%3A%22AF%20Active%22"

        response = requests.get(endpoint)

        responseJSON = response.json()

        return Response(responseJSON)