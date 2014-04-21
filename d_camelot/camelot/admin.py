from django.contrib import admin

from camelot.models import *


class DCamelotAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Dates)
admin.site.register(DCamelot, DCamelotAdmin)


