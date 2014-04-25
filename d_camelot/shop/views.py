# Create your views here.
from django.views.generic import View, TemplateView

from shop.models import Shop
from camelot.models import DCamelot
from inventory.models import ShopInventory


class ShopBaseView(TemplateView):
    template_name = 'shop_landing.html'
    context_vars = {}

    def get_context_data(self, **kwargs):
        context = {}
        d_camelot = DCamelot.objects.latest('id')
        context = super(ShopBaseView, self).get_context_data(**kwargs)
        context.update(self.context_vars)
        context.update({'d_camelot': d_camelot})
        return context


class ShopIndexView(ShopBaseView):

    def get(self, request, *args, **kwargs):
        shop = kwargs.get('shop', '')
        products = []
        try:
            shop_obj = Shop.objects.get(slug=shop)
            products = ShopInventory.objects.get_items_by_shop(shop_obj.id)
        except:
            pass
        self.context_vars = {
            'shop': shop_obj,
            'products': products,
            'category': ''
        }
        return super(ShopIndexView, self).get(request, *args, **kwargs)


class ProductListView(ShopBaseView):
    def get(self, request, *args, **kwargs):
        print '\n=rached\n',args
        shop = kwargs.get('shop', '')
        category = kwargs.get('category_id', '')
        products = []
        try:
            shop_obj = Shop.objects.get(slug=shop)
            products = ShopInventory.objects.get_items_by_shop_by_category(shop_obj.id, category)
        except:
            pass
        self.context_vars = {
            'shop': shop_obj,
            'products': products,
            'category': category
        }
        return super(ProductListView, self).get(request, *args, **kwargs)