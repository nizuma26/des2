from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Item, BeginningInventory

@receiver(post_save, sender=Item)
def item_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = 'ART' + str(get_id).zfill(5)
        instance.save(update_fields=['code'])

@receiver(post_save, sender=BeginningInventory)
def beginning_inventory_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        get_id = instance.id
        instance.code = 'INV' + str(get_id).zfill(4)
        instance.save(update_fields=['code'])