import { Columns } from "../../../types/ui"
import { PatientFormValues } from "../../../types/orders/patients";

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'full_name', label: 'Paciente', width: 'auto' },
    { id: 'email', label: 'Email' },
    { id: 'phone_number', label: 'Número de teléfono' },
    { id: 'birthdate', label: 'Fecha de nacimiento'},
    { id: 'gender', label: 'Género' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Pacientes',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const BREADCRUMB_ADD_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Pacientes',
    route: '/patient',
    type: 'link',
  },
  {
    name: 'Nuevo paciente',
    type: 'typography',
  },
];

export const DEFAULT_FORM_VALUES:PatientFormValues = {
  names: '',
  last_names: '',
  email: '',
  phone_number: '',
  address: '',
  cedula: '',
  gender: 'F',
  birthdate: null,
  is_active: true,
  affiliations: [],
};

export const QUERY_KEYS = {
  list: 'patients',
  patient: 'patient'
};

export const GENDER_CHOICES = [
  {
    value: 'M',
    label: 'Masculino',
  },
  {
    value: 'F',
    label: 'Femenino',
  }
]
