import os

from django.db import models
from apps.configuration.choices import TYPE_CURRENCY_CHOICES, TYPE_TAX_CHOICES
from backend.settings import MEDIA_ROOT, MEDIA_URL

def image_directory_path(instance, filename):
    image_name = 'laboratories/{0}/'.format(instance.name)
    full_path = os.path.join(MEDIA_ROOT, image_name)

    if os.path.exists(full_path):
        has_image = os.listdir(full_path)
        print(has_image)
        if len(has_image) > 0:
            for i in has_image:
                image = os.path.join(full_path, i)
                os.remove(image)
        
    return f'{image_name}{filename}'

class Laboratory(models.Model):
    code = models.CharField(max_length=50, unique=True, null=True, blank=True)
    name = models.CharField(max_length=250, unique=True)
    document = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=100, unique=True)
    address = models.CharField(max_length=200, blank=True)
    description = models.TextField(null=True, blank=True)
    local_phone = models.CharField(max_length=11, unique=True)
    mobile_phone = models.CharField(max_length=11, null=True, blank=True)
    manager = models.CharField(max_length=70)
    cedula = models.CharField(max_length=8, unique=True)
    logo = models.ImageField(upload_to=image_directory_path, null=True, blank=True)
    is_main=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)

    class Meta:
        db_table = 'laboratory'
        verbose_name = 'laboratorio'
        verbose_name_plural = 'laboratorios'
        ordering = ['id']
        default_permissions = ()
        permissions = (
            ('view_laboratory', 'Ver laboratorios'),
            ('add_laboratory', 'Crear laboratorio'),
            ('delete_laboratory', 'Eliminar laboratorio'),
            ('change_laboratory', 'Modificar laboratorio'),
        )

    def __str__(self):
        return self.code

    @property
    def get_logo(self):
        if self.logo:
            return self.logo.url
        return f'{MEDIA_URL}laboratories/default.jpg'
    
class CashRegister(models.Model):
    name = models.CharField("nombre", max_length=50)
    is_active = models.BooleanField("estado", default=True)
    laboratory = models.ForeignKey(
        Laboratory,
        verbose_name="laboratorio", 
        on_delete=models.PROTECT, 
        related_name="+"
    )

    class Meta:
        db_table = 'cash_register'
        verbose_name = 'caja'
        verbose_name_plural = 'cajas'
        default_permissions = ()
        permissions = (
            ('view_cash_register', 'Ver caja'),
            ('add_cash_register', 'Crear caja'),
            ('delete_cash_register', 'Eliminar caja'),
            ('change_cash_register', 'Modificar caja'),
        )
    
    def __str__(self):
        return self.name
    
    @property
    def get_user(self):
        user_cash_register = getattr(self, 'user_cash_register', None)
        if user_cash_register:
            return user_cash_register.get_full_name
        return "Sin asignar"
    
class Tax(models.Model):
    name = models.CharField("nombre", max_length=50)
    tax = models.DecimalField("impuesto", max_digits=4, decimal_places=1)
    is_active = models.BooleanField("estado", default=True)
    type_tax = models.CharField(
        "Tipo de impuesto", 
        max_length=25, 
        choices=TYPE_TAX_CHOICES, 
        default=TYPE_TAX_CHOICES[0][0]
    )
    update = models.DateTimeField(auto_now=True, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'tax'
        verbose_name = 'impuesto'
        verbose_name_plural = 'impuestos'
        default_permissions = ()
        permissions = (
            ('view_tax', 'Ver impuestos'),
            ('add_tax', 'Crear impuesto'),
            ('delete_tax', 'Eliminar impuesto'),
            ('change_tax', 'Modificar impuesto'),
        )

    def __str__(self):
        return self.name

class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=5, blank=True)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=4)
    is_active = models.BooleanField(default=True)
    type_currency = models.CharField(
        "clasificación", 
        max_length=10, 
        choices=TYPE_CURRENCY_CHOICES,
        null=True,
        blank=True
    )
    is_foreign = models.BooleanField(default=False)
    with_tax = models.BooleanField(default=False)
    tax = models.ForeignKey(Tax, on_delete=models.PROTECT, null=True, related_name="+")
    update = models.DateTimeField(auto_now=True, null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'currency'
        verbose_name = 'moneda'
        verbose_name_plural = 'monedas'
        default_permissions = ()
        permissions = (
            ('view_currency', 'Ver monedas'),
            ('add_currency', 'Crear moneda'),
            ('delete_currency', 'Eliminar moneda'),
            ('change_currency', 'Modificar moneda'),
        )

    def __str__(self):
        return f"{self.code} ({self.name})"

    
class Bank(models.Model):
    name = models.CharField("nombre", max_length=50, unique=True)
    is_active = models.BooleanField("estado", default=True)

    class Meta:
        db_table = 'bank'
        verbose_name = 'banco'
        verbose_name_plural = 'bancos'
        default_permissions = ()
        permissions = (
            ('view_bank', 'Acceder al modulo de bancos'),
            ('add_banck', 'Crear banco'),
            ('delete_bank', 'Eliminar banco'),
            ('change_bank', 'Modificar banco'),
        )

    def __str__(self):
        return self.name