from django.template import Library

from inventory.models import *
from shop.models import Shop

register = Library()


@register.inclusion_tag('widgets/category.html')
def get_category_menu(shop_slug):
    results = {}
    shop = Shop.objects.get(slug=shop_slug)
    results['shop'] = shop
    return results
# {% get_category_menu %}