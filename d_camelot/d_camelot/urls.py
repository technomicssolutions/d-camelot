
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin


admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('camelot.urls')),
    url(r'^shop/$', include('shop.urls')),
    url(r'^payment/$', include('payment.urls')),
    url(r'^report/$', include('report.urls')),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'^site_media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)
