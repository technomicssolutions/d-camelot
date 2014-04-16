# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Brand'
        db.create_table(u'inventory_brand', (
            (u'dates_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['camelot.Dates'], unique=True, primary_key=True)),
            ('brand_name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=100)),
        ))
        db.send_create_signal(u'inventory', ['Brand'])

    def backwards(self, orm):
        # Deleting model 'Brand'
        db.delete_table(u'inventory_brand')

    models = {
        u'camelot.dates': {
            'Meta': {'object_name': 'Dates'},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'modified_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'null': 'True', 'blank': 'True'})
        },
        u'inventory.brand': {
            'Meta': {'object_name': 'Brand', '_ormbases': [u'camelot.Dates']},
            'brand_name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'}),
            u'dates_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['camelot.Dates']", 'unique': 'True', 'primary_key': 'True'})
        }
    }

    complete_apps = ['inventory']