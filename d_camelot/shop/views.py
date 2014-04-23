# Create your views here.
from django.views.generic import View, TemplateView


class ShopIndexView(TemplateView):
    template_name = 'shop_landing.html'
