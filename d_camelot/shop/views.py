# Create your views here.
from django.views.generic import View, TemplateView

from shop.models import Shop


class ShopBaseView(TemplateView):
    context_vars = {}

    def get_context_data(self, **kwargs):
        context = {}
        context = super(ShopBaseView, self).get_context_data(**kwargs)
        context.update(self.context_vars)
        return context


class ShopIndexView(ShopBaseView):
    template_name = 'shop_landing.html'

    def get(self, request, *args, **kwargs):
        shop = kwargs.get('shop', '')
        shops = Shop.objects.all().order_by('id')
        self.context_vars = {
            'shops': shops,
            'current_shop': shop,
        }
        return super(ShopIndexView, self).get(request, *args, **kwargs)
