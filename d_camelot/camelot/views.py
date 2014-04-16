import simplejson
import urllib2
import ast
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404, render
from django.views.generic.base import View
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db import IntegrityError
from django.db.models import Q
from django.contrib.auth.models import User
from django.core.mail import send_mail, BadHeaderError, EmailMessage, EmailMultiAlternatives, mail_admins
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout

from shop.models import Shop

class HomeView(View):
    def get(self, request, *args, **kwargs):
    	shops = Shop.objects.all().order_by('id')
        context = {
        	'shops': shops
        }
        return render(request, 'home.html',context)

    def post(self, request, *args, **kwargs):
        context = {}
        return render(request, 'home.html',context)

class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html', {})
