# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-11-10 07:32
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispatcher', '0003_auto_20161110_0130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2016, 11, 10, 1, 32, 51, 458000)),
        ),
    ]
