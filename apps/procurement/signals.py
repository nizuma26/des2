from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PurchaseRequisition, PurchaseOrder, AccountPayable, ReceivingOrder

@receiver(post_save, sender=PurchaseRequisition)
def purchase_requisition_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = 'REQ' + str(get_id).zfill(7)
        instance.save(update_fields=['code'])

@receiver(post_save, sender=PurchaseOrder)
def purchase_order_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = str(get_id).zfill(7)
        instance.save(update_fields=['code'])

@receiver(post_save, sender=AccountPayable)
def account_payable_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = str(get_id).zfill(7)
        instance.save(update_fields=['code'])

@receiver(post_save, sender=ReceivingOrder)
def receiving_order_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = str(get_id).zfill(7)
        instance.save(update_fields=['code'])
