from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

import datetime

class Profession(models.Model):
    title = models.CharField(max_length=30, default="None")
    jobs = models.ManyToManyField("Job", blank=True)

    def __unicode__(self):
        return self.title


class Job(models.Model):
    title = models.CharField(max_length=30, default="None")

    def __unicode__(self):
        return self.title


class Location(models.Model):
    lat = models.DecimalField(max_digits=8, decimal_places=5)
    longitude = models.DecimalField(max_digits=8, decimal_places=5)

    def __unicode__(self):
        return str(self.lat)+" " +str(self.longitude)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profession = models.ForeignKey(Profession)
    location = models.ForeignKey(Location)
    jobs = models.ManyToManyField("Job", blank=True)
    admin = models.BooleanField(default=False)

    def __unicode__(self):
        return self.user.username

class Task(models.Model):
    worker = models.ForeignKey(Profile)
    name = models.CharField(max_length=50, default="name")
    date = models.DateTimeField(default=datetime.datetime.now())
    active = models.BooleanField(default=True)

    def __unicode__(self):
        return self.name
