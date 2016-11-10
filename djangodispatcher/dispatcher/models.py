from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

import datetime

# Create your models here.
class Task(models.Model):
    worker = models.ForeignKey(User)
    name = models.CharField(max_length=50, default="name")
    date = models.DateTimeField(default=datetime.datetime.now())
    # priority