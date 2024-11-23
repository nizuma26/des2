from django.db import models
from django.db.models.functions import Coalesce
from datetime import datetime
from decimal import Decimal

from backend.settings import AUTH_USER_MODEL
from apps.configuration.models import Laboratory, Currency, Tax, CashRegister, Bank
from apps.inventory.models import Item

from apps.base.choices import PAYMENT_TERMS_CHOICES, PAYMENT_METHOD_CHOICES

from .choices import (
    RESULT_STATUS_CHOICES,
    TEST_TYPES, 
    CONCEPT_FOR_AFFILIATION, 
    GENDER_CHOICES, 
    COST_TYPE_CHOICES, 
    ORDER_STATUS_CHOICES, 
    INVOICE_STATUS_CHOICES,
    PARAMETER_TYPE_CHOICES,
    REDUCTION_TYPE_CHOICES
)

class LabTestCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'lab_test_category'
        verbose_name = 'categoría de examen'
        verbose_name_plural = 'categoría de examenes'
        default_permissions = ()
        permissions = (
            ('view_lab_test_category', 'Ver categoría de examenes'),
            ('add_lab_test_category', 'Crear categoría de examen'),
            ('delete_lab_test_category', 'Eliminar categoría de examen'),
            ('change_lab_test_category', 'Modificar categoría de examen'),
        )

class Sample(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'sample'
        verbose_name = 'muestra'
        verbose_name_plural = 'muestras'
        default_permissions = ()
        permissions = (
            ('view_samples', 'Acceso al modulo de muestras'),
            ('add_sample', 'Crear muestra'),
            ('delete_sample', 'Eliminar muestra'),
            ('change_sample', 'Modificar muestra'),
        )

class Container(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'container'
        verbose_name = 'contenedor'
        verbose_name_plural = 'contenedores'
        default_permissions = ()
        permissions = (
            ('view_containers', 'Acceso al modulo de contenedores'),
            ('add_container', 'Crear contenedor'),
            ('delete_container', 'Eliminar contenedor'),
            ('change_container', 'Modificar contenedor'),
        )

class LabTest(models.Model):
    name = models.CharField(max_length=100, unique=True)
    abbreviation = models.CharField(max_length=6, unique=True)
    description = models.CharField(max_length=250, blank=True)
    indications = models.CharField(max_length=250, blank=True)
    test_type = models.CharField(max_length=10, choices=TEST_TYPES, default=TEST_TYPES[0][0])
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(LabTestCategory, on_delete=models.PROTECT)
    sample = models.ForeignKey(Sample, on_delete=models.PROTECT, null=True)
    container = models.ForeignKey(Container, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f'{self.abbreviation} - {self.name}'
    
    class Meta:
        db_table = 'lab_test'
        verbose_name = 'examen'
        verbose_name_plural = 'examenes'
        default_permissions = ()
        permissions = (
            ('view_lab_test', 'Ver examenes'),
            ('add_lab_test', 'Crear examen'),
            ('delete_lab_test', 'Eliminar examen'),
            ('change_lab_test', 'Modificar examen'),
        )

class LabTestProfile(models.Model):

    """Model definition for Test."""

    profile = models.ForeignKey(LabTest, on_delete=models.CASCADE, related_name='lab_tests')
    lab_test = models.ForeignKey(LabTest, on_delete=models.CASCADE, null=True, related_name='+')

    class Meta:
        db_table = 'lab_test_profile'
        verbose_name = 'perfil de examen'
        verbose_name_plural = 'perfil de examenes'
        default_permissions = ()

class Parameter(models.Model):
    lab_test = models.ForeignKey(LabTest, on_delete=models.CASCADE, related_name="parameters")
    name = models.CharField(max_length=30)
    parameter_type = models.CharField(
        max_length=20, 
        choices=PARAMETER_TYPE_CHOICES, 
        default=PARAMETER_TYPE_CHOICES[0][0]
    )
    measure_unit = models.CharField(max_length=20, blank=True)
    options = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='sub_parameters')

    class Meta:
        db_table = 'parameter'
        verbose_name = 'parametro'
        verbose_name_plural = 'parametros'
        default_permissions = ()

    def __str__(self):
        return f'{self.lab_test.abbreviation} - {self.name}'
    
    @property
    def sub_parameters(self):
        parent = Parameter.objects.filter(parent=self).order_by('-id')
        return parent

class ReferenceValue(models.Model):
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE, related_name="reference_values")
    name = models.CharField(max_length=50)
    normal_value = models.CharField('valores normales', max_length=50, null=True, blank=True)

    def __str__(self):
        return f'{self.parameter.id} - {self.name}'
    
    class Meta:
        db_table = 'reference_value'
        verbose_name = 'valor de referencia'
        verbose_name_plural = 'valores de referencia'
        default_permissions = ()
        
class LabTestPrice(models.Model):
    lab_test = models.ForeignKey(LabTest, on_delete=models.CASCADE, related_name="prices")
    laboratory = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name="+")
    standard = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    emergency = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    affiliated = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    home_service = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    exempt = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    holiday = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.lab_test.abbreviation
    
    class Meta:
        db_table = 'lab_test_price'
        verbose_name = 'costo de examen'
        verbose_name_plural = 'costo de examenes'
        default_permissions = ()

class LabTestItems(models.Model):
    lab_test = models.ForeignKey(LabTest, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="+")
    quantity = models.PositiveIntegerField(default=1)
    reduction_type = models.CharField(
        max_length=20, 
        choices=REDUCTION_TYPE_CHOICES, 
        default=REDUCTION_TYPE_CHOICES[0][0]
    )
    
    class Meta:
        db_table = 'lab_test_items'
        verbose_name = 'artículo del examen'
        verbose_name_plural = 'artículos de examenes'
        default_permissions = ()

class Affiliation(models.Model):

    """Model definition for Patient."""
    name = models.CharField("nombre", max_length=50, unique=True)
    concept = models.CharField(
        "concepto", 
        max_length=25, 
        choices=CONCEPT_FOR_AFFILIATION,
        default=CONCEPT_FOR_AFFILIATION[0][0]
    )
    value = models.DecimalField("valor", max_digits=5, decimal_places=2, default=0.00)
    rif = models.CharField('rif', max_length=30, blank=True)
    phone_number = models.CharField("número de teléfono", max_length=12, null=True, blank=True)
    email = models.EmailField("correo electrónico", blank=True)
    address = models.CharField(max_length=200, blank=True)
    contact_person = models.CharField(max_length=60, blank=True)
    credit_limit = models.DecimalField("límite de crédito", max_digits=12, decimal_places=2, default=0.00)
    credit_days = models.IntegerField("días de crédito", default=15)
    postal_code = models.CharField("código postal", max_length=4, null=True, blank=True)
    price_type = models.CharField(
        'tipo de precio',
        max_length=30, 
        choices=COST_TYPE_CHOICES, 
        default=COST_TYPE_CHOICES[2][0]
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'affiliation'
        verbose_name = 'afiliación'
        verbose_name_plural = 'afiliaciones'
        default_permissions = ()
        permissions = (
            ('view_affiliation', 'Acceso al modulo de afiliaciones'),
            ('add_affiliation', 'Crear afiliación'),
            ('delete_affiliation', 'Eliminar afiliación'),
            ('change_affiliation', 'Modificar afiliación'),
        )

class Patient(models.Model):
    names = models.CharField("nombres", max_length=80, blank=True)
    last_names = models.CharField("apellidos", max_length=80, blank=True)
    cedula = models.CharField("cédula", max_length=9, unique=True)
    phone_number = models.CharField("número de teléfono", max_length=11, null=True, blank=True)
    address = models.CharField("dirección", max_length=250, blank=True)
    email = models.EmailField("email", blank=True)
    is_active = models.BooleanField(default=True)
    birthdate = models.DateField(verbose_name="fecha de nacimiento")
    gender = models.CharField("género", max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return f"{self.cedula}-{self.names}"
    
    class Meta:
        db_table = 'patient'
        verbose_name = 'paciente'
        verbose_name_plural = 'pacientes'
        default_permissions = ()
        permissions = (
            ('view_patient', 'Acceso al modulo de pacientes'),
            ('add_patient', 'Crear paciente'),
            ('delete_patient', 'Eliminar paciente'),
            ('change_patient', 'Modificar paciente'),
        )
        
    @property
    def full_name(self):
        return f"{self.names} {self.last_names}"

class PatientAffiliation(models.Model):

    """Model definition for Patient."""
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="affiliations")
    affiliation = models.ForeignKey(Affiliation, on_delete=models.CASCADE)

    def __str__(self):
        return f"Afiliacion {self.affiliation.name} del paciente {self.patient.cedula}/{self.patient.names}"
    
    class Meta:
        db_table = 'patient_affiliation'
        verbose_name = 'afiliacion de paciente'
        verbose_name_plural = 'afiliaciones de paciente'
        default_permissions = ()

class Order(models.Model):
    code = models.CharField('codigo', max_length=20, null=True, blank=True)
    created_at = models.DateTimeField('fecha de creación', auto_now_add=True)
    order_date = models.DateField('fecha de orden', default=datetime.now)
    delivery_date = models.DateField('fecha de entrega', null=True, default=datetime.now)
    credit_deadline = models.DateField('fecha límite de crédito', null=True, blank=True)
    patient_number = models.PositiveIntegerField('número de paciente del día', default=0)
    hour = models.TimeField(auto_now=True)
    comment = models.TextField('comentario', blank=True)
    secondary_total = models.DecimalField('total en divisa', max_digits=12, decimal_places=2, default=0.00)    
    main_total = models.DecimalField('total principal', max_digits=12, decimal_places=2, default=0.00)
    discount = models.DecimalField('descuento', max_digits=12, decimal_places=2, default=0.00)
    amount_paid = models.DecimalField('monto pagado', default=0.00, max_digits=14, decimal_places=2)
    exchange_rate = models.DecimalField('tasa de cambio', max_digits=10, decimal_places=4, default=1.00)
    credit_limit = models.DecimalField('límite de crédito', max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(
        'estado', 
        max_length=35, 
        choices=ORDER_STATUS_CHOICES, 
        default=ORDER_STATUS_CHOICES[0][0]
    )
    cost_type = models.CharField(
        'tipo de costo',
        max_length=30, 
        choices=COST_TYPE_CHOICES, 
        default=COST_TYPE_CHOICES[0][0]
    )
    payment_type = models.CharField(
        'Tipo de pago', 
        max_length=10, 
        choices=PAYMENT_TERMS_CHOICES, 
        default=PAYMENT_TERMS_CHOICES[0][0]
    )
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name='patients')
    affiliation = models.ForeignKey(Affiliation, on_delete=models.SET_NULL, null=True, related_name='affiliations')
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='user_orders')
    laboratory = models.ForeignKey(Laboratory, on_delete=models.PROTECT, related_name="laboratory_orders")
    cash_register = models.ForeignKey(CashRegister, on_delete=models.PROTECT, related_name="order_cash_registers")
    tax = models.ForeignKey(Tax, verbose_name="impuesto", null=True, on_delete=models.PROTECT, related_name="+" )
    main_currency = models.ForeignKey(Currency, verbose_name="moneda principal", null=True, on_delete=models.PROTECT, related_name="+" )
    secondary_currency = models.ForeignKey(Currency, verbose_name="moneda secundaria", null=True, on_delete=models.PROTECT, related_name="+")
    keep_patient_number = models.BooleanField('conservar numero de paciente', default=False)
    is_invoiced = models.BooleanField('facturado', default=False)

    class Meta:
        db_table = 'order'
        verbose_name = 'orden'
        verbose_name_plural = 'ordenes'
        default_permissions = ()
        permissions = (
            ('view_orders', 'Acceso al modulo de ordenes'),
            ('add_order', 'Crear ordenes'),
            ('cancel_order', 'Anular orden'),
            ('change_order', 'Modificar orden'),
            ('cancel_order_invoice', 'Anular factura de orden'),
        )

    def __str__(self):
        return self.code

    def check_order_status(self):
        # Todos los examenes del detalle
        order_details = self.order_detail.all()
        
        # Devuelve True si todos los examenes tienen un status de procesado
        all_processed = all(detail.status == 'Procesado' for detail in order_details)

        # Se cambia el status de la orden si todos estan procesados
        if all_processed:
            self.status = 'Procesado'
            self.save(update_fields=['status'])
    
    @property
    def balance(self):
        new_balance = self.main_total - self.amount_paid
        return max(new_balance, 0)
    
    def calculate_amount_paid(self):
        self.amount_paid = Decimal(self.order_payments.all().aggregate(
            result=Coalesce(models.Sum("payment_amount"), 0.00, 
            output_field=models.DecimalField()
        )).get("result"))
        self.save(update_fields=["amount_paid"])
    
    @property
    def invoice_number(self):
        return None
        # order_invoice = getattr(self, "order_invoice", None)
        # if order_invoice and hasattr(order_invoice, "invoice_number"):
        #     return order_invoice.invoice_number
        # return None

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, verbose_name='orden', on_delete=models.CASCADE, related_name='order_detail')
    lab_test = models.ForeignKey(LabTest, verbose_name='examen', on_delete=models.CASCADE, related_name='orders')
    discount = models.DecimalField('descuento', default=0.00, max_digits=14, decimal_places=2)
    price = models.DecimalField('precio', max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(
        'estado', 
        max_length=20, 
        choices=RESULT_STATUS_CHOICES, 
        default=RESULT_STATUS_CHOICES[0][0]
    )

    def __str__(self):
        return f"Examen de la order: {self.order.code}"
    
    def total(self):
        applyDiscount = self.price * (self.discount / 100)
        result = self.price - applyDiscount
        return round(result, 2)
    
    class Meta:
        db_table = 'order_detail'
        verbose_name = 'detalle de orden'
        verbose_name_plural = 'detalle de ordenes'
        default_permissions = ()
        
class OrderInvoice(models.Model):
    invoice_number = models.CharField('numero de factura', max_length=20, blank=True)
    invoice_date = models.DateField('fecha de factura', auto_now=True)
    company = models.ForeignKey(Affiliation, on_delete=models.PROTECT, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, null=True)
    tax = models.ForeignKey(Tax, on_delete=models.PROTECT, null=True)
    client_name = models.CharField('nombre o razon social', max_length=250, blank=True)
    on_behalf = models.CharField('a nombre de', max_length=250, blank=True)
    ci_or_rif = models.CharField('cedula o rif', max_length=50, blank=True)
    address = models.CharField('domicilio', max_length=20, blank=True)
    phone_number = models.CharField('numero de telefono', max_length=20, blank=True)        
    hour = models.TimeField(auto_now=True)
    status = models.CharField(
        'estado', 
        max_length=30, 
        choices=INVOICE_STATUS_CHOICES, 
        default=INVOICE_STATUS_CHOICES[0][0]
    )
    total = models.DecimalField(
        'total facturado',
        max_digits=12, 
        decimal_places=2,
        default=0.00
    )
    secondary_total = models.DecimalField(
        'total en divisa',
        max_digits=12,
        decimal_places=2,
        default=0.00
    )    
    discount = models.DecimalField('descuento', max_digits=12, decimal_places=2, default=0.00)
    payment_type = models.CharField(
        'condicion de pago', 
        max_length=10, 
        choices=PAYMENT_TERMS_CHOICES, 
        default=PAYMENT_TERMS_CHOICES[1][0]
    )
    comment = models.CharField('comentario', max_length=250, blank=True)
    orders = models.ManyToManyField(Order, related_name='invoices')

    def __str__(self):
        return self.invoice_number
    
    class Meta:
        db_table = 'order_invoice'
        verbose_name = 'factura'
        verbose_name_plural = 'facturas'
        default_permissions = ()
        permissions = (
            ('view_invoice', 'Ver facturas'),
            ('add_invoice', 'Crear factura'),
            ('cancel_invoice', 'Anular factura'),
        )

class OrderPayment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_payments', null=True)  # Relación opcional
    invoice = models.ForeignKey(OrderInvoice, on_delete=models.CASCADE, related_name='invoice_payments', null=True)
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

    def __str__(self):
        return f'Abono-{self.id} de la orden: {self.order.code}'

    class Meta:
        db_table = 'order_payment'
        verbose_name = 'abono de orden o factura'
        verbose_name_plural = 'abonos de ordenes o factura'
        default_permissions = ()
    
    @property
    def get_balance(self):
        return self.order.balance

class Result(models.Model):
    order = models.ForeignKey(Order, verbose_name='orden', on_delete=models.PROTECT, related_name="results")
    lab_test = models.ForeignKey(LabTest, verbose_name='examen', on_delete=models.PROTECT, related_name='lab_test_result')
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='user_result')
    status = models.CharField('estado', max_length=50, choices=RESULT_STATUS_CHOICES, default=RESULT_STATUS_CHOICES[0][0])
    result_date = models.DateField('fecha de resultados', auto_now=True)
    hour = models.TimeField(auto_now=True)
    observation = models.TextField('observación', blank=True)

    def __str__(self):
        return self.code
    
    class Meta:
        db_table = 'result'
        verbose_name = 'resultado'
        verbose_name_plural = 'resultados'
        default_permissions = ()
        permissions = (
            ('view_result', 'Acceso al modulo de carga de resultados'),
            ('add_result', 'Cargar resultados a pacientes'),
            ('approve_result', 'Aprobar resultados'),
            ('change_result', 'Modificar resultados'),
        )

class ResultValues(models.Model):
    result = models.ForeignKey(Result, verbose_name='resultado', on_delete=models.CASCADE, related_name='result_values')
    measure_unit = models.CharField('unidad de medida', max_length=30, null=True, blank=True)
    parameter = models.CharField('parametro', max_length=50)
    result_value = models.CharField('resultado', max_length=100)
    parameter_type = models.CharField(
        max_length=20, 
        choices=PARAMETER_TYPE_CHOICES, 
        default=PARAMETER_TYPE_CHOICES[0][0]
    )
    reference_value = models.CharField('valor de referencia', max_length=20, null=True, blank=True)
    normal_value = models.CharField('valores normales', max_length=20, null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='sub_values')
    
    def __str__(self):
        return self.value
    
    class Meta:
        db_table = 'result_values'
        verbose_name = 'detalle de resultado'
        verbose_name_plural = 'detalle de resultados'
        default_permissions = ()