from django.db import models
from django.core.urlresolvers import reverse
from django.template.defaultfilters import slugify

from camelot.models import Dates

SHOPE_TYPE = (
    ('baby', 'Baby'),
    ('ladies', 'Ladies'),
    ('mens', 'Mens'),
    ('textiles', 'Textiles'),
)


# class ShopManager(models.Manager):
    # q = super(ShopManager, self).get_query_set()


class Shop(Dates):
    shop_name = models.CharField('Name', max_length=100, unique=True)
    shop_type = models.CharField('Shop Type', max_length=10, choices=SHOPE_TYPE)
    slider_image = models.ImageField('Slider Image', upload_to="uploads/shop/")
    logo = models.ImageField('Logo', upload_to="uploads/shop/")
    slug = models.SlugField()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.shop_name)
        super(Shop, self).save(*args, **kwargs)

    # objects = ShopManager()

    class Meta:
        verbose_name = 'Shop'
        verbose_name_plural = 'Shops'

    def __unicode__(self):
        return self.shop_name

    # function to return the shop landing page url.
    def get_url(self):
        return reverse('shop_landing', args=(self.slug,))

    def get_brands_list(self):
        try:
            q = self.shopinventory_set.values('item__brand__brand_name').distinct()
            r = [i['item__brand__brand_name'] for i in q]
        except:
            r = []
        return r


