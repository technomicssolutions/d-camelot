from django.db import models
from django.core.urlresolvers import reverse

from camelot.models import Dates
from shop.models import Shop

from categories.models import CategoryBase


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


class CustomCategory(CategoryBase):

    class Meta(CategoryBase.Meta):
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    # def get_category_url(self, shop):
    #     return reverse('product_list', args=(shop, self.id))


class Item(models.Model):
    code = models.CharField('Product Code', max_length=20, unique=True)
    name = models.CharField('Product Name', max_length=50, unique=False)
    image = models.ImageField('Product Image', null=True, blank=True, upload_to="uploads/products/")
    category = models.ForeignKey(CustomCategory, null=True, blank=True)
    description = models.TextField('Description', null=True, blank=True)
    unit = models.ForeignKey(UnitOfMeasure)
    brand = models.ForeignKey(Brand)
    barcode = models.CharField('Barcode', max_length=50, null=True, blank=True)
    tax = models.DecimalField('Tax', max_digits=14, decimal_places=2, default=0)

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name + ' - ' + self.code

    def get_image(self):
        if self.image:
            return self.image.url
        return '/static/img/product_missing.png'


class Warehouse(models.Model):
    name = models.CharField('Name of Warehouse', max_length=100, unique=True)
    location = models.CharField('Location of Warehouse', max_length=200, blank=True)

    def __unicode__(self):
        return self.name


class Inventory(models.Model):
    quantity = models.IntegerField('Quantity', default=0)
    unit_price = models.DecimalField('Unit Price', max_digits=14, decimal_places=2, default=0)
    selling_price = models.DecimalField('Selling Price', max_digits=14, decimal_places=2, default=0)
    discount_permit_percentage = models.DecimalField('Discount permitted percentage', max_digits=14, decimal_places=3, default=0, null=True, blank=True)
    discount_permit_amount = models.DecimalField('Discount permitted amount', max_digits=14, decimal_places=3, default=0, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Inventory'
        abstract = True


class WarehouseInventory(Inventory):
    item = models.ForeignKey(Item)
    warehouse = models.ForeignKey(Warehouse)

    def __unicode__(self):
        return self.item.get_name()

    class Meta:
        unique_together = ("item", "warehouse")
        verbose_name = 'Warehouse Inventory'
        verbose_name_plural = 'Warehouse Inventory'


class ShopInventoryManager(models.Manager):
    def get_items_by_shop(self, shop):
        q = super(ShopInventoryManager, self).get_query_set().filter(shop_id=shop)
        return q

# returns the root nodes of categories in shop
    def get_categories_by_shop(self, shop_id):
        result = []
        t = []
        q = self.get_items_by_shop(shop_id).order_by('item__category')
        if q:
            for x in q:
                root = x.item.category.get_root()
                if root.id not in t:
                    result.append(root)
                t.append(root.id)
        return result

    def get_items_by_shop_by_category(self, shop_id, category_id):
        q = self.get_items_by_shop(shop_id).filter(item__category_id=category_id)
        return q

    def product_exist_for_category(self, shop_id, category_id):
        return self.get_items_by_shop(shop_id).filter(item__category_id=category_id).exists()


class ShopInventory(Inventory):
    item = models.ForeignKey(Item)
    shop = models.ForeignKey(Shop)

    def __unicode__(self):
        return self.item.get_name()

    objects = ShopInventoryManager()

    class Meta:
        unique_together = ("item", "shop")
        verbose_name = 'Shop Inventory'
        verbose_name_plural = 'Shop Inventory'
