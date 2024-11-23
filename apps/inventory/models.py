from django.db import models
import os
from datetime import datetime
from backend.settings import MEDIA_ROOT, AUTH_USER_MODEL
from apps.configuration.models import Laboratory

# ---------------------------------------

class ItemCategory(models.Model):
    name = models.CharField('nombre', max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'item_category'
        verbose_name = 'Categoría de artículo'
        verbose_name_plural = 'Categoría de artículos'
        default_permissions = ()
        permissions = (
            ('view_item_category', 'Ver categorías de artículos'),
            ('add_item_category', 'Crear categoría de artículo'),
            ('delete_item_category', 'Eliminar categoría de artículo'),
            ('change_item_category', 'Modificar categoría de artículo'),
        )

class MeasureUnit(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'measure_unit'
        verbose_name = 'Unidad de medida'
        verbose_name_plural = 'Unidades de medida'
        default_permissions = ()
        permissions = (
            ('view_unit_measure', 'Ver unidades de medida'),
            ('add_unit_measure', 'Crear unidad de medida'),
            ('delete_unit_measure', 'Eliminar unidad de medida'),
            ('change_unit_measure', 'Modificar unidad de medida'),
        )

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'brand'
        verbose_name = 'Marca'
        verbose_name_plural = 'Marcas'
        default_permissions = ()
        permissions = (
            ('view_brand', 'Ver marcas de artículos'),
            ('add_brand', 'Crear marca de artículo'),
            ('delete_brand', 'Eliminar marca de artículo'),
            ('change_brand', 'Modificar marca de artículo'),
        )

class Model(models.Model):
    name = models.CharField(max_length=100, unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'model'
        verbose_name = 'Modelo'
        verbose_name_plural = 'Modelos'
        default_permissions = ()
        permissions = (
            ('view_model', 'Ver modelos de artículos'),
            ('add_model', 'Crear modelo de artículo'),
            ('delete_model', 'Eliminar modelo de artículo'),
            ('change_model', 'Modificar modelo de artículo'),
        )

def image_directory_path(instance, filename):
    image_name = 'items/{0}/'.format(instance.name)
    full_path = os.path.join(MEDIA_ROOT, image_name)

    if os.path.exists(full_path):
        has_image = os.listdir(full_path)
        if len(has_image) > 0:
            for i in has_image:
                image = os.path.join(full_path, i)
                os.remove(image)
        
    return f'{image_name}{filename}'

class Item(models.Model):
    code = models.CharField(max_length=25, db_index=True, null=True, blank=True)
    name = models.CharField(max_length=150)
    item_type = models.CharField(max_length=25, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(default='items/default.jpg', upload_to=image_directory_path, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    with_tax = models.BooleanField(default=True, verbose_name='¿Se cobra impuesto?')
    is_inventoriable = models.BooleanField(default=False)
    use_in_tests = models.BooleanField(default=False, verbose_name='¿Se usa en examenes?')
    category = models.ForeignKey(ItemCategory, on_delete=models.PROTECT)
    measure_unit = models.ForeignKey(MeasureUnit, on_delete=models.PROTECT)
    model = models.ForeignKey(Model, on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f'{self.code} - {self.name}'

    class Meta:
        db_table = 'item'
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'
        default_permissions = ()
        permissions = (
            ('view_item', 'Ver artículos'),
            ('add_item', 'Crear artículo'),
            ('delete_item', 'Eliminar artículo'),
            ('change_item', 'Modificar artículo'),
        )

class Inventory(models.Model):
    item = models.ForeignKey(Item, on_delete=models.PROTECT, related_name='inventory_item_set')
    laboratory = models.ForeignKey(Laboratory, on_delete=models.PROTECT)
    stock = models.PositiveIntegerField(default=0)
    min_stock = models.PositiveIntegerField(default=0)
    max_stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    reserved = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'inventory'
        verbose_name = 'Inventario de artículo'
        verbose_name_plural = 'Inventario de artículos'
        default_permissions = ()
        permissions = (
            ('view_inventory', 'Ver inventario de artículos'),
            ('change_all_inventory', 'Modificar stock mínimo y máximo de artículos en todos los laboratorios'),
        )

    def __str__(self):
        return f'{self.laboratory.code} - {self.item.code}'
    
    @property
    def available(self):
        return self.stock - self.reserved

class InventoryAdjustment(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.PROTECT)
    code = models.CharField(max_length=30, blank=True)
    reason = models.CharField(max_length=100)
    comment = models.CharField(max_length=250, null=True, blank=True)
    status = models.CharField(max_length=20)
    date = models.DateField(default=datetime.now)
    hour = models.TimeField(default=datetime.now)

    def __str__(self):
        return f'{self.code} - {self.laboratory.code}'

    class Meta:
        db_table = 'inventory_adjustment'
        verbose_name = 'Ajuste de inventario'
        verbose_name_plural = 'Ajuste de inventarios'
        default_permissions = ()
        permissions = (
            ('view_adjustment', 'Ver ajustes de inventario'),
            ('add_adjustment', 'Crear ajuste de inventario'),
            ('change_adjustment', 'Modificar ajuste de inventario'),
        )

class AdjustmentDetail(models.Model):
    inventory_adjustment = models.ForeignKey(InventoryAdjustment, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    current_stock = models.IntegerField(default=0)
    assign_stock = models.IntegerField(default=0)
    final_stock = models.IntegerField(default=0)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.inventory_adjustment.code} - {self.item.code}'

    class Meta:
        db_table = 'adjustment_detail'
        verbose_name = 'Detalle de ajuste de inventario'
        verbose_name_plural = 'Detalle de ajustes de inventario'
        default_permissions = ()

class BeginningInventory(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT)
    laboratory = models.ForeignKey(Laboratory, on_delete=models.PROTECT)
    code = models.CharField(max_length=25, blank=True)
    note = models.TextField(blank=True)
    status = models.CharField(max_length=20, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    last_date = models.DateField(default=datetime.now)
    hour = models.TimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f'{self.code} - {self.laboratory.code}'

    class Meta:
        db_table = 'beginning_inventory'
        verbose_name = 'Inventario inicial'
        verbose_name_plural = 'Inventarios iniciales'
        default_permissions = ()
        permissions = (
            ('view_beginning_inventory', 'Ver inventarios iniciales'),
            ('add_beginning_inventory', 'Crear inventario inicial'),
            ('change_beginning_inventory', 'Modificar inventario inicial'),
        )

class BeginningInventoryDetail(models.Model):
    beginning_inventory = models.ForeignKey(BeginningInventory, on_delete=models.CASCADE, related_name='beginning_inventory_set')
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    stock = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f'{self.beginning_inventory.code} - {self.item.code}'

    class Meta:
        db_table = 'beginning_inventory_detail'
        verbose_name = 'Detalle de inventario inicial'
        verbose_name_plural = 'Detalle de inventarios iniciales'
        default_permissions = ()
