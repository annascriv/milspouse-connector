from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v

# Create your models here.

class User(AbstractUser):

    email = models.EmailField(max_length = 255, unique=True)

    name = models.CharField(default=None, null=True)

    age = models.IntegerField(default=None, null=True, validators=[v.MinValueValidator(18), v.MaxValueValidator(100)])

    bio = models.CharField(default=None, null=True)

    BASE_CHOICES = (
        ("Clear AF Station", "Clear Air Force Station"),
        ("Vance AFB", "Vance AFB"),
        ("Altus AFB", "Altus AFB"),
        ("Tinker AFB", "Tinker AFB"),
        ("McConnell AFB", "McConnell AFB"),
        ("USAF Academy", "USAF Academy"),
        ("Schriever AFB", "Schriever AFB"),
        ("Peterson AFB", "Peterson AFB"),
        ("Buckley AFB", "Buckley AFB"),
    )


    base = models.CharField(null=False, choices=BASE_CHOICES)

    dogs = models.BooleanField(default=False)

    number_of_kids = models.IntegerField(default=0, validators=[v.MinValueValidator(0), v.MaxValueValidator(12)])

    
