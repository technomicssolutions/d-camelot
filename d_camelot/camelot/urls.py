from django.conf.urls import patterns,include,url
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from views import (HomeView,IndexView)

urlpatterns = patterns('',
	url(r'^$', HomeView.as_view(), name="home"),
)
