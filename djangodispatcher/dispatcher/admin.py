from django.contrib import admin

# Register your models here.

from .models import Task, Profession, Location, Profile, Job, Sensor

admin.site.register(Task)
admin.site.register(Profession)
admin.site.register(Location)
admin.site.register(Profile)
admin.site.register(Job)
admin.site.register(Sensor)