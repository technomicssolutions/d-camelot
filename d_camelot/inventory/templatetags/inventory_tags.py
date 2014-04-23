from django.template import Library

from inventory.models import ShopInventory
from shop.models import Shop


register = Library()


@register.inclusion_tag('widgets/category.html')
def get_category_menu(shop_slug):
    results = {}
    shop = Shop.objects.get(slug=shop_slug)
    categories = ShopInventory.objects.get_categories_by_shop(shop.id)
    results['shop'] = shop
    results['categories'] = categories
    return results
# {% get_category_menu %}