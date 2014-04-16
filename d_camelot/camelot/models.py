from django.db import models

class Dates(models.Model):
    created_date = models.DateTimeField('Created Date', auto_now_add=True, null=True, blank=True)
    modified_date = models.DateTimeField('Modified Date', auto_now=True, null=True, blank=True)

    class Meta:
        verbose_name = 'Date'
        verbose_name_plural = 'Dates'