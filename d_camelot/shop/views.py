# Create your views here.
from django.views.generic import View, TemplateView

from shop.models import Shop
from camelot.models import DCamelot
from inventory.models import ShopInventory

class ShopBaseView(TemplateView):
    context_vars = {}

    def get_context_data(self, **kwargs):
        context = {}
        d_camelot = DCamelot.objects.latest('id')
        context = super(ShopBaseView, self).get_context_data(**kwargs)
        context.update(self.context_vars)
        context.update({'d_camelot': d_camelot})
        return context


class ShopIndexView(ShopBaseView):
    template_name = 'shop_landing.html'

    def get(self, request, *args, **kwargs):
        shop = kwargs.get('shop', '')
        products = []
        try:
            shop_obj = Shop.objects.get(slug=shop)
            products = ShopInventory.objects.get_items_by_shop(shop_obj.id)
        except:
            pass
        self.context_vars = {
            'current_shop': shop,
            'products': products
        }
        return super(ShopIndexView, self).get(request, *args, **kwargs)
