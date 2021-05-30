# Generated by Django 3.0.8 on 2021-05-29 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(max_length=255)),
                ('about', models.TextField(blank=True, default='')),
                ('location', models.TextField(blank=True, default='')),
                ('admissions', models.TextField(blank=True, default='')),
                ('image', models.FileField(blank=True, null=True, upload_to='')),
            ],
            options={
                'db_table': 'listing',
            },
        ),
    ]
