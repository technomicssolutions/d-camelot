# import re

from django import template
# from django.core.urlresolvers import reverse

register = template.Library()


@register.simple_tag
def navactive(request, pattern):
    path = request.path.split('/')
    if len(path) > 2:
        return 'active' if path[2] == pattern else ''
    return ""


# @register.simple_tag
# def menuactive(request, urls):
#     if request.path in (reverse(url) for url in urls.split()):
#         return "active"
#     return ""


