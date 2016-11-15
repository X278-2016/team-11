from django.contrib import admin

# Register your models here.

from .models import Task, Profession, Location, Profile

admin.site.register(Task)
admin.site.register(Profession)
admin.site.register(Location)
admin.site.register(Profile)