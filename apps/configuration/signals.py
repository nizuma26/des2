from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Laboratory

@receiver(post_save, sender=Laboratory)
def laboratory_code(sender, instance, created, **kwargs):
    if created and not instance.code:
        uuid = instance.id
        instance.code = 'LAB' + str(uuid).zfill(3)
        instance.save(update_fields=['code'])