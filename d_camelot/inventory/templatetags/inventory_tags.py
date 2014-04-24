from django.template import Library

from inventory.models import ShopInventory, CustomCategory
from shop.models import Shop


register = Library()


@register.inclusion_tag('widgets/category.html')
def get_category_menu(shop_slug):
    results = {}
    shop = Shop.objects.get(slug=shop_slug)
    categories = ShopInventory.objects.get_categories_by_shop(shop.id)
    c = CustomCategory.objects.filter(parent=None)
    results['shop'] = shop
    results['categories'] = categories
    results['category'] = categories[0]
    results['parents'] = c
    return results
# {% get_category_menu %}
