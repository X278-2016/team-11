from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

import datetime

class Profession(models.Model):
    title = models.CharField(max_length=30, default="None")

    def __unicode__(self):
        return self.title


class Location(models.Model):
    city = models.CharField(max_length=30, default="None")
    state = models.CharField(max_length=30, default="None")
    def __unicode__(self):
        return self.city

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profession = models.ForeignKey(Profession)
    location = models.ForeignKey(Location)

    def __unicode__(self):
        return self.user.username

class Task(models.Model):
    worker = models.ForeignKey(Profile)
    name = models.CharField(max_length=50, default="name")
    date = models.DateTimeField(default=datetime.datetime.now())
    active = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name