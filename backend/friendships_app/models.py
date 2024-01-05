from django.db import models
from user_app.models import User

# Create your models here.

class Friendships(models.Model):

    user = models.ForeignKey(User, related_name = 'user', on_delete=models.CASCADE)
    
    friend = models.ForeignKey(User, related_name='friend', on_delete = models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'friend']


