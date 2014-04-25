from django.template import Library

from inventory.models import ShopInventory, CustomCategory
from shop.models import Shop


register = Library()


@register.inclusion_tag('widgets/category.html')
def get_category_menu(shop_id, category_id=None):
    results = {}
    shop = Shop.objects.get(id=shop_id)
    if category_id:
        categories = CustomCategory.objects.filter(id=category_id)
    else:
        categories = ShopInventory.objects.get_categories_by_shop(shop_id)
    results['parents'] = categories
    results['shop_obj'] = shop
    return results
# {% get_category_menu %}
