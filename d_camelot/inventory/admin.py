from django.contrib import admin
from inventory.models import *


class WarehouseInventoryAdmin(admin.ModelAdmin):
    list_display = ('item', 'warehouse')


class ShopInventoryAdmin(admin.ModelAdmin):
    list_display = ('item', 'shop')

admin.site.register(Brand)
admin.site.register(UnitOfMeasure)
admin.site.register(Item)
admin.site.register(WarehouseInventory, WarehouseInventoryAdmin)
admin.site.register(ShopInventory, ShopInventoryAdmin)


# fields = (('item', 'warehouse'), 'quantity' ,'unit_price' ,'selling_price' ,'discount_permit_percentage' ,'discount_permit_amount')
