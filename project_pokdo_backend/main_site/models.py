from django.db import models

class Listing(models.Model):
    school_name = models.CharField(max_length=255)
    about = models.TextField(default="", blank=True)
    location = models.TextField(default="", blank=True)
    admissions = models.TextField(default="", blank=True)
    image = models.FileField(null=True, blank=True)

    class Meta:
        db_table = 'listing'