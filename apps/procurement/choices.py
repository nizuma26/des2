REQUISITION_STATUS_CHOICES = [
    ('Pendiente', 'Pendiente'),
    ('Completado', 'Completado'),
    ('Convertido en Orden de Compra', 'Convertido en Orden de Compra'),
    ('Aprobado', 'Aprobado'),
    ('Rechazado', 'Rechazado'),
    ('Devuelto', 'Devuelto'),
    ('Borrador', 'Borrador'),
    ('Anulado', 'Anulado')
]

PURCHASE_ORDER_STATUS_CHOICES = [
    ('Pendiente', 'Pendiente'),
    ('Cerrada', 'Cerrada'),
    ("Parcialmente Recibido", "Parcialmente Recibido"),
    ("Completamente Recibido", "Completamente Recibido"),
    ('Anulada', 'Anulada'),
    ('Borrador', 'Borrador'),
]

RECEIVING_ORDER_STATUS_CHOICES = [
    ("Parcialmente Recibido", "Parcialmente Recibido"),
    ("Completamente Recibido", "Completamente Recibido"),
    ("Anulado", "Anulado"),
]

RECEIVING_ORDER_DETAIL_STATUS_CHOICES = [
    ("Completo", "Completo"),
    ("Incompleto", "Incompleto"),
]

ACCOUNT_PAYABLE_STATUS_CHOICES = [
    ("Pendiente", "Pendiente"),
    ("Pagado", "Pagado"),
    ("Vencido", "Vencido"),
    ("Anulado", "Anulado"),
]