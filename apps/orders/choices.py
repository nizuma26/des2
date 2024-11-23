TEST_TYPES = [
    ("simple", "Simple"),
    ("perfil", "Perfil")
]

CONCEPT_FOR_AFFILIATION = [
    ("Descuento", "Descuento"),
    ("Exonerado", "Exonerado"),
    ("Incremento", "Incremento"),
]

GENDER_CHOICES = [
    ("M", "Masculino"),
    ("F", "Femenino"),
]

COST_TYPE_CHOICES = [
    ("Particular", "standard"),
    ("Emergencia", "emergency"),
    ("Seguro/empresa", "affiliated"),
    ("Domicilio", "home_service"),
    ("Fin de semana y feriado", "holiday"),
    ("Exonerado", "exempt"),
]

ORDER_STATUS_CHOICES = [
    ("Pendiente", "pendiente"),
    ("Procesado", "Procesado"),
    ("Parcialmente procesado", "Parcialmente procesado"),
    ("Borrador", "borrador"),
    ("Anulado", "anulado")
]

INVOICE_STATUS_CHOICES = [
    ("Pagado", "pagado"),
    ("Pendiente", "pendiente"),
    ("Anulado", "anulado"),
]

PARAMETER_TYPE_CHOICES = [
    ("number", "number"),
    ("text", "text"),
    ("select", "select"),
    ("composite", "composite"),
]

REDUCTION_TYPE_CHOICES = [
    ("captura_resultados", "Captura de resultados"),
    ("orden", "Orden"),
]

RESULT_STATUS_CHOICES = [
    ("Por procesar", "Por procesar"),
    ("Procesado", "Procesado"),
    ("Aprobado", "Aprobado"),
    ("Impreso", "Impreso"),
    ("Entregado", "Entregado")
]

# LAB_TEST_STATUS_CHOICES = [
#     ("Por procesar", "Por procesar"),
#     ("En proceso", "Por procesar"),
#     ("Procesado", "Procesado"),
# ]