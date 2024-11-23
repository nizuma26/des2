from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, OrderInvoice

@receiver(post_save, sender=Order)
def order_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        uuid = instance.id
        instance.code = "-"+str(uuid).zfill(7)
        instance.save(update_fields=['code'])

@receiver(post_save, sender=OrderInvoice)
def invoice_code(sender, instance, created, **kwargs):
    if created and not instance.invoice_number:
        uuid = instance.id
        instance.invoice_number = str(uuid).zfill(7)
        instance.save(update_fields=['invoice_number'])