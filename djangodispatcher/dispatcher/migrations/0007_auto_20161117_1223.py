# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-11-17 18:23
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispatcher', '0006_auto_20161117_1221'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Jobs',
            new_name='Job',
        ),
        migrations.AlterField(
            model_name='task',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2016, 11, 17, 12, 23, 23, 310000)),
        ),
    ]