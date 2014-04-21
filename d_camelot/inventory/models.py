from django.db import models

from camelot.models import Dates

class Brand(Dates):
    brand_name = models.CharField('Name', max_length=100, unique=True)

    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'

    def __unicode__(self):
        return self.brand_name
