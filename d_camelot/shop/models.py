from django.db import models

from camelot.models import Dates
from inventory.models import Brand

SHOPE_TYPE = (
    ('baby', 'Baby'),
    ('ladies', 'Ladies'),
    ('mens', 'Mens'),
    ('textiles', 'Textiles'),
)
class Shop(Dates):
    shop_name = models.CharField('Name', max_length=100, unique=True)
    shop_type = models.CharField('Shop Type', max_length=10, choices=SHOPE_TYPE)
    slider_image = models.ImageField('Slider Image', upload_to="uploads/shop/")
    logo = models.ImageField('Logo', upload_to="uploads/shop/")
    brands = models.ManyToManyField(Brand)

    class Meta:
        verbose_name = 'Shop'
        verbose_name_plural = 'Shops'

    def __unicode__(self):
        return self.shop_name