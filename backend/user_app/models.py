from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v

# Create your models here.

class User(AbstractUser):

    email = models.EmailField(max_length = 255, unique=True)

    name = models.CharField(default=None, null=True)

    age = models.IntegerField(default=None, null=True, validators=[v.MinValueValidator(18), v.MaxValueValidator(100)])

    bio = models.CharField(default=None, null=True)


    base = models.CharField(null=False)

    dogs = models.BooleanField(default=False)

    number_of_kids = models.IntegerField(default=0, validators=[v.MinValueValidator(0), v.MaxValueValidator(12)])

    profile_picture = models.ImageField(upload_to='profile_pic/', blank=True, null=True, default=None)
    
