from django.conf.urls import patterns,include,url
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from shop.views import ShopIndexView


urlpatterns = patterns('',
    url(r'test/$', ShopIndexView.as_view(), name="shop_index"),
)
