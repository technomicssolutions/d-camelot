from django.conf.urls import patterns,include,url
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from views import (HomeView, IndexView, LoginView, SignUpView, LogOutView)


urlpatterns = patterns('',
    url(r'^$', HomeView.as_view(), name="home"),
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^signup/$', SignUpView.as_view(), name='signup'),
    url(r'^logout/$', LogOutView.as_view(), name='logout')
)
