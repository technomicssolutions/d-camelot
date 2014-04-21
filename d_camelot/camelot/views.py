import simplejson
import urllib2
import ast
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404, render
from django.views.generic import View, FormView
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
from django.contrib.auth.forms import AuthenticationForm

from shop.models import Shop
from camelot.models import DCamelot


class HomeView(View):
    def get(self, request, *args, **kwargs):
        shops = Shop.objects.all().order_by('id')
        d_camelot = DCamelot.objects.latest('id')
        context = {
            'shops': shops,
            'd_camelot': d_camelot
        }
        return render(request, 'home.html', context)

    def post(self, request, *args, **kwargs):
        context = {}
        return render(request, 'home.html', context)


class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'home.html', {})


class LoginView(FormView):
    form_class = AuthenticationForm

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('home'))

    def form_invalid(self, form):
        return HttpResponse('error')

    def form_valid(self, form):
        login(self.request, form.get_user())
        return HttpResponse('success')


class LogOutView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(reverse('home'))


class SignUpView(FormView):
    def get(self, request, *args, **kwargs):
        return render(request, 'registration/signup.html', {})

    def post(self, request, *args, **kwargs):
        data = {}
        data['result'] = 'error'
        data['error'] = ''
        password = request.POST.get('password')
        email = request.POST.get('email')
        try:
            user = User.objects.create_user(email, email, password)
            user.backend = "django.contrib.auth.backends.ModelBackend"
            login(request, user)
            data['result'] = 'success'
        except:
            data['error'] = 'Email already registered'
        return HttpResponse(simplejson.dumps(data))
