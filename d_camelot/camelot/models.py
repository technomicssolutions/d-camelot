from django.db import models


class Dates(models.Model):
    created_date = models.DateTimeField('Created Date', auto_now_add=True, null=True, blank=True)
    modified_date = models.DateTimeField('Modified Date', auto_now=True, null=True, blank=True)

    class Meta:
        verbose_name = 'Date'
        verbose_name_plural = 'Dates'


class DCamelot(models.Model):
    title = models.CharField('Name of Site', max_length=200)
    logo = models.ImageField('Logo Image', upload_to="uploads/d_camelot/", null=True, blank=True)

    def __unicode__(self):
        return self.title

    def get_logo(self):
        if self.logo:
            return self.logo.url
        else:
            return ''

    class Meta:
        verbose_name = 'DCamelot'
        verbose_name_plural = 'DCamelot'
