from django.conf.urls import patterns,include,url
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from shop.views import ShopIndexView, ProductListView


urlpatterns = patterns('',
    url(r'^(?P<shop>.+)/(?P<category_id>\d+)/$', ProductListView.as_view(), name="product_list"),
    url(r'(?P<shop>.+)/$', ShopIndexView.as_view(), name="shop_landing"),
)
