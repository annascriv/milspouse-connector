# Generated by Django 4.2.7 on 2024-01-09 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_alter_user_base'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='profile_pic/'),
        ),
    ]