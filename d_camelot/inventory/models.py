from django.db import models

from camelot.models import Dates
from shop.models import Shop


class Brand(Dates):
    brand_name = models.CharField('Name', max_length=100, unique=True)

    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'

    def __unicode__(self):
        return self.brand_name


class UnitOfMeasure(models.Model):
    unit = models.CharField('Unit Of Measure', max_length=50, unique=True)

    def __unicode__(self):
        return self.unit


class Item(models.Model):
    code = models.CharField('Product Code', max_length=20, unique=True)
    name = models.CharField('Product Name', max_length=50, unique=False)
    description = models.TextField('Description', null=True, blank=True)
    unit = models.ForeignKey(UnitOfMeasure)
    brand = models.ForeignKey(Brand)
    barcode = models.CharField('Barcode', max_length=50, null=True, blank=True)
    tax = models.DecimalField('Tax', max_digits=14, decimal_places=2, default=0)

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name + ' - ' + self.code


# class Warehouse(models.Model):
#     name = models.CharField('Name of Warehouse', max_length=100, unique=True)
#     location = models.CharField('Location of Warehouse', max_length=200, blank=True)

#     def __unicode__(self):
#         return self.name


# class Inventory(models.Model):
#     quantity = models.IntegerField('Quantity', default=0)
#     unit_price = models.DecimalField('Unit Price', max_digits=14, decimal_places=2, default=0)
#     selling_price = models.DecimalField('Selling Price', max_digits=14, decimal_places=2, default=0)
#     discount_permit_percentage = models.DecimalField('Discount permitted percentage', max_digits=14, decimal_places=3, default=0, null=True, blank=True)
#     discount_permit_amount = models.DecimalField('Discount permitted amount', max_digits=14, decimal_places=3, default=0, null=True, blank=True)

#     class Meta:
#         verbose_name_plural = 'Inventory'
#         abstract = True


# class WarehouseInventory(Inventory):
#     item = models.ForeignKey(Item, unique=True)
#     warehouse = models.ForeignKey(Warehouse)

#     def __unicode__(self):
#         return self.item.get_name()

#     class Meta:
#         verbose_name = 'Warehouse Inventory'
#         verbose_name_plural = 'Warehouse Inventory'


# class ShopInventory(Inventory):
#     item = models.ForeignKey(Item, unique=True)
#     shop = models.ForeignKey(Shop)

#     def __unicode__(self):
#         return self.item.get_name()

#     class Meta:
#         verbose_name = 'Shop Inventory'
#         verbose_name_plural = 'Shop Inventory'
