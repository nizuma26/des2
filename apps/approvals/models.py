from datetime import datetime

from django.db import models

from backend.settings import AUTH_USER_MODEL

from .choices import STATUS_CHOICES

# ----------------------------------------

class Approvals(models.Model):
    approver = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='approver')    
    action = models.CharField(max_length=12, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0])
    comment = models.TextField(blank=True)
    operation = models.CharField(max_length=255, blank=True)
    operation_code = models.CharField(max_length=25, blank=True)
    approval_date = models.DateField(default=datetime.now)

    def __str__(self):
        return f'Operación: {self.operation_code}-{self.operation} ha sido {self.action}'

    class Meta:
        db_table = 'approvals'
        verbose_name = 'aprobación'
        verbose_name_plural = 'aprobaciones'
        default_permissions = ()
        permissions = (
            ('view_approvals', 'Ver aprobaciones'),
            ('approve_purchase_requisition', 'Aprobar requisiciones de compra'),
            ('approve_purchase_order', 'Aprobar ordenes de compra'),
        )