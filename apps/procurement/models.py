from django.db.models.functions import Coalesce
from decimal import Decimal
from django.db import models
from datetime import datetime

from backend.settings import AUTH_USER_MODEL
from apps.configuration.models import Bank, Laboratory, Tax
from apps.inventory.models import Item
from apps.configuration.models import Currency

from apps.base.choices import PAYMENT_METHOD_CHOICES, PAYMENT_TERMS_CHOICES
from .choices import (
    REQUISITION_STATUS_CHOICES, 
    PURCHASE_ORDER_STATUS_CHOICES, 
    RECEIVING_ORDER_STATUS_CHOICES,
    RECEIVING_ORDER_DETAIL_STATUS_CHOICES, 
    ACCOUNT_PAYABLE_STATUS_CHOICES
)

# ---------------------------------------

class Supplier(models.Model):
    trade_name = models.CharField('nombre comercial', max_length=90, unique=True)
    legal_name = models.CharField('razón social', max_length=90, unique=True)
    rif = models.CharField('RIF', max_length=30, unique=True)
    phone_number = models.CharField('número de teléfono', max_length=20, null=True, blank=True)
    email = models.EmailField('correo electrónico', blank=True)
    address = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    contact_person = models.CharField(max_length=60, blank=True)
    credit_limit = models.DecimalField('límite de crédito', max_digits=12, decimal_places=2, default=0.00)
    credit_days = models.PositiveIntegerField(default=15)
    postal_code = models.CharField('código postal', max_length=4, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.rif} - {self.trade_name}'

    class Meta:
        db_table = 'supplier'
        verbose_name = 'proveedor'
        verbose_name_plural = 'proveedores'
        default_permissions = ()
        permissions = (
            ('view_supplier', 'Ver proveedores'),
            ('add_supplier', 'Crear proveedor'),
            ('delete_supplier', 'Eliminar proveedor'),
            ('change_supplier', 'Modificar proveedor'),
        )

class PurchaseRequisition(models.Model):
    code = models.CharField(max_length=12, null=True, blank=True)
    created_at = models.DateTimeField('fecha de creación', auto_now_add=True)
    request_date = models.DateField('fecha de solicitud', default=datetime.now)
    required_date = models.DateField('fecha requerida', default=datetime.now)
    request_hour = models.TimeField(auto_now=True)
    comment = models.TextField(blank=True)
    status = models.CharField(max_length=35, choices=REQUISITION_STATUS_CHOICES, default=REQUISITION_STATUS_CHOICES[0][0])
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='laboratory_requisition')
    requester = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='requester')

    def __str__(self):
        return f'Requisición {self.code} del laboratorio {self.laboratory.code}'

    class Meta:
        db_table = 'purchase_requisition'
        verbose_name = 'requisición de compra'
        verbose_name_plural = 'requisiciones de compras'
        default_permissions = ()
        permissions = (
            ('view_purchase_requisition', 'Ver requisiciones de compras'),
            ('add_purchase_requisition', 'Crear requisición de compra'),
            ('delete_purchase_requisition', 'Eliminar requisición de compra'),
            ('change_purchase_requisition', 'Modificar requisición de compra'),
        )

class PurchaseRequisitionDetail(models.Model):
    requisition = models.ForeignKey(PurchaseRequisition, on_delete=models.CASCADE, related_name='requisition_detail_set')
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    approved_amount = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.requisition.code} - 0{self.id}'

    class Meta:
        db_table = 'purchase_requisition_detail'
        verbose_name = 'detalle de requisición de compra'
        verbose_name_plural = 'detalle de requisiciones de compras'
        default_permissions = ()

class PurchaseOrder(models.Model):
    code = models.CharField(max_length=30, blank=True)
    comment = models.TextField(blank=True)
    status = models.CharField(
        max_length=35, 
        choices=PURCHASE_ORDER_STATUS_CHOICES, 
        default=PURCHASE_ORDER_STATUS_CHOICES[0][0]
    )
    tax = models.ForeignKey(Tax, on_delete=models.PROTECT, null=True)
    subtotal =models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    secondary_total = models.DecimalField('total en divisa', max_digits=12, decimal_places=2, default=0.00)    
    main_total = models.DecimalField('total principal', max_digits=12, decimal_places=2, default=0.00)
    amount_paid = models.DecimalField('monto pagado', default=0.00, max_digits=14, decimal_places=2)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=4, default=1.00)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    order_date = models.DateField(default=datetime.now)
    order_hour = models.TimeField(auto_now=True)
    required_date = models.DateField(null=True, blank=True)
    confirmed_date = models.DateField(null=True)
    payment_term = models.PositiveIntegerField('plazo de pago', default=1)
    main_currency = models.ForeignKey(
        Currency, 
        verbose_name="moneda principal",
        null=True, 
        on_delete=models.PROTECT, 
        related_name="+"
    )
    secondary_currency = models.ForeignKey(
        Currency, 
        verbose_name="moneda secundaria", 
        null=True, 
        on_delete=models.PROTECT, 
        related_name="+"
    )
    requisition = models.OneToOneField(
        PurchaseRequisition, 
        on_delete=models.PROTECT, 
        null=True, 
        related_name='purchase_requisition'
    )
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.PROTECT, 
        related_name='user_purchase_orders'
    )
    laboratory = models.ForeignKey(
        Laboratory, 
        on_delete=models.PROTECT, 
        related_name='laboratory_purchase_orders'
    )
    supplier = models.ForeignKey(
        Supplier, 
        on_delete=models.PROTECT, 
        related_name='suppliers_purchase_orders'
    )    

    class Meta:
        db_table = 'purchase_order'
        verbose_name = 'orden de compra'
        verbose_name_plural = 'ordenes de compras'
        default_permissions = ()
        permissions = (
            ('view_purchase_order', 'Ver ordenes de compras'),
            ('add_purchase_order', 'Crear orden de compra'),
            ('delete_purchase_order', 'Eliminar orden de compra'),
            ('change_purchase_order', 'Modificar orden de compra'),
        )
    
    def __str__(self):
        return f'{self.code} - {self.laboratory.code}'

class PurchaseOrderDetail(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='purchase_order_detail')
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        db_table = 'purchase_order_detail'
        verbose_name = 'detalle de orden de compra'
        verbose_name_plural = 'detalle de ordenes de compras'
        default_permissions = ()

    def __str__(self):
        return f'{self.purchase_order.code} - 0{self.id}'

class ReceivingOrder(models.Model):
    code = models.CharField(max_length=20, blank=True)
    order = models.ForeignKey(PurchaseOrder, on_delete=models.PROTECT, related_name="receiving_order")
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    reception_date = models.DateField(default=datetime.now)
    reception_hour = models.TimeField(auto_now=True)
    comment = models.TextField(blank=True)
    status = models.CharField(max_length=50, choices=RECEIVING_ORDER_STATUS_CHOICES)
    user = models.ForeignKey(
        AUTH_USER_MODEL, 
        on_delete=models.PROTECT, 
        related_name='+'
    )

    class Meta:
        db_table = 'receiving_order'
        verbose_name = 'recepción de ordenes'
        verbose_name_plural = 'rececion  de compras'
        default_permissions = ()
        permissions = (
            ('view_receiving_order', 'Acceder al módulo de recepción de órdenes de compra'),
            ('add_receiving_order', 'Crear recepción de orden de compra'),
            ('disable_receiving_order', 'Anular recepción de orden de compra'),
            ('change_receiving_order', 'Modificar recepción de orden de compra'),
        )
    
    def __str__(self):
        return f'Recepción de la orden {self.order.code}'

class ReceivingOrderDetail(models.Model):
    receiving_order = models.ForeignKey(ReceivingOrder, related_name='receiving_order_detail', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    comment = models.CharField(max_length=250)
    expected_quantity = models.PositiveIntegerField(verbose_name="cantidad esperada")
    received_quantity = models.PositiveIntegerField(verbose_name="cantidad recibida")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=35, 
        choices=RECEIVING_ORDER_DETAIL_STATUS_CHOICES, 
        default=RECEIVING_ORDER_DETAIL_STATUS_CHOICES[0][0]
    )

    class Meta:
        db_table = 'receiving_order_detail'
        verbose_name = 'detalle de recepción de orden de compra'
        verbose_name_plural = 'detalles de receciones ordenes de compras'
        default_permissions = ()

    def __str__(self):
        return f"{self.item.code} - Recibido: {self.received_quantity}"

class AccountPayable(models.Model):
    purchase_order = models.OneToOneField(PurchaseOrder, on_delete=models.CASCADE, related_name='purchase_account_payable')
    code = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=50, choices=ACCOUNT_PAYABLE_STATUS_CHOICES)
    balance = models.DecimalField(default=0.00, max_digits=14, decimal_places=2)
    amount_paid = models.DecimalField('monto pagado', default=0.00, max_digits=14, decimal_places=2)
    due_date = models.DateField(default=datetime.now, null=True)
    created_at = models.DateField(auto_now_add=True, null=True)
    hour = models.TimeField(auto_now=True, null=True)
    
    def __str__(self):
        return f'{self.code} - {self.purchase.code}'

    class Meta:
        db_table = 'account_payable'
        verbose_name = 'cuenta por pagar'
        verbose_name_plural = 'cuentas por pagar'
        default_permissions = ()
        permissions = (
            ('view_account_payable', 'Ver cuentas por pagar'),
            ('make_payments', 'Realizar pagos'),
        )
    
    def calculate_amount_paid(self):
        self.amount_paid = Decimal(self.accounts_payable_payments.all().aggregate(
            result=Coalesce(models.Sum("payment_amount"), 0.00, 
            output_field=models.DecimalField()
        )).get("result"))
        self.save(update_fields=["amount_paid"])

class AccountPayablePayment(models.Model):
    account_payable = models.ForeignKey(AccountPayable, on_delete=models.CASCADE, related_name='accounts_payable_payments')
    payment_amount = models.DecimalField("abono", default=0.01, max_digits=14, decimal_places=2)
    payment_method = models.CharField(
        "método de pago",
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default=PAYMENT_METHOD_CHOICES[0][0]
    )
    payment_ref = models.CharField("número de referencia", max_length=50, blank=True)
    payment_date = models.DateField("fecha de pago", auto_now=True)
    payment_time = models.TimeField("hora de pago", auto_now=True)
    comment = models.CharField("comentario", max_length=150, blank=True)
    bank = models.ForeignKey(Bank, verbose_name="banco", on_delete=models.PROTECT, null=True, related_name="+")
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def __str__(self):
        return f'pago-{self.id} de la cuenta por pagar: {self.account_payable.code}'

    class Meta:
        db_table = 'account_payable_payment'
        verbose_name = 'pago de cuenta por pagar'
        verbose_name_plural = 'pagos de cuentas por pagar'
        default_permissions = ()