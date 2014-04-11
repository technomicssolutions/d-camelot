from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('camelot.urls')),
    url(r'^shop/$', include('shop.urls')),
    url(r'^payment/$', include('payment.urls')),
    url(r'^report/$', include('report.urls')),
)
