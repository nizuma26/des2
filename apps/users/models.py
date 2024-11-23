import os
import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from backend.settings import MEDIA_ROOT, MEDIA_URL
from apps.configuration.models import Laboratory, CashRegister

class CustomUserManager(UserManager):
    
    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        
        return self._create_user(username, email, password, **extra_fields)

def image_directory_path(instance, filename):
    image_name = 'users/{0}/'.format(instance.username)
    full_path = os.path.join(MEDIA_ROOT, image_name)

    if os.path.exists(full_path):
        has_image = os.listdir(full_path)
        if len(has_image) > 0:
            for i in has_image:
                image = os.path.join(full_path, i)
                os.remove(image)
        
    return f'{image_name}{filename}'

class User(AbstractBaseUser, PermissionsMixin):
    laboratory = models.ForeignKey(Laboratory, on_delete=models.PROTECT, null=True, related_name="laboratory_users")
    cash_register = models.OneToOneField(CashRegister, on_delete=models.PROTECT, null=True, related_name="user_cash_register")
    names = models.CharField(max_length=80, blank=True)
    last_names = models.CharField(max_length=80, blank=True)
    username = models.CharField(max_length=150, unique=True)
    cedula = models.CharField(max_length=8, blank=True)
    phone_number = models.CharField(max_length=11, null=True, blank=True)
    address = models.TextField(blank=True)
    image = models.ImageField(default='users/avatar_default.jpg', upload_to=image_directory_path, null=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    email_reset_token = models.TextField(null=True, blank=True)

    objects = CustomUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f'{self.cedula} / {self.username}'

    def generate_token_email(self):
        return str(uuid.uuid4())

    def create_or_update_password(self, password):
        if self.pk is None:
            self.set_password(password)
        else:
            user = User.objects.get(pk=self.pk)
            if user.password != password:
                self.set_password(password)
    
    @property
    def get_image(self):
        if self.image:
            return f'{MEDIA_URL}{self.image}'
        return f'{MEDIA_URL}users/avatar_default.jpg'
    
    @property
    def get_full_name(self):
        """
        Devuelve los nombres más los apellidos, con un espacio entre ellos.
        """
        full_name = "%s %s" % (self.names, self.last_names)
        return full_name.strip()
    
    @property
    def get_laboratory(self):
        if self.laboratory:
            return self.laboratory.name
        return 'Sin laboratorio'
    
    @property
    def get_cash_register(self):
        if self.cash_register:
            return self.cash_register.name
        return 'Sin asignar'

    class Meta:
        db_table = 'user'
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'
        default_permissions = ()
        permissions = (
            ('view_user', 'Ver Usuarios'),
            ('add_user', 'Crear Usuario'),
            ('delete_user', 'Eliminar Usuario'),
            ('change_user', 'Modificar Usuario'),
        )
