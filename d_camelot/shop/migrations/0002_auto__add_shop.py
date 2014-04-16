# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Shop'
        db.create_table(u'shop_shop', (
            (u'dates_ptr', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['camelot.Dates'], unique=True, primary_key=True)),
            ('shop_name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=100)),
            ('shop_type', self.gf('django.db.models.fields.CharField')(max_length=10)),
            ('slider_image', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('logo', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'shop', ['Shop'])

        # Adding M2M table for field brands on 'Shop'
        db.create_table(u'shop_shop_brands', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('shop', models.ForeignKey(orm[u'shop.shop'], null=False)),
            ('brand', models.ForeignKey(orm[u'inventory.brand'], null=False))
        ))
        db.create_unique(u'shop_shop_brands', ['shop_id', 'brand_id'])

    def backwards(self, orm):
        # Deleting model 'Shop'
        db.delete_table(u'shop_shop')

        # Removing M2M table for field brands on 'Shop'
        db.delete_table('shop_shop_brands')

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
        },
        u'shop.shop': {
            'Meta': {'object_name': 'Shop', '_ormbases': [u'camelot.Dates']},
            'brands': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['inventory.Brand']", 'symmetrical': 'False'}),
            u'dates_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['camelot.Dates']", 'unique': 'True', 'primary_key': 'True'}),
            'logo': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'shop_name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'}),
            'shop_type': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'slider_image': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['shop']