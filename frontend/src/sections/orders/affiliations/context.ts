import { Columns } from "../../../types/ui"
import { Affiliation } from "../../../types/orders/affiliations";

export const TABLE_COLUMNS: Array<Columns> = [
    { id: 'name', label: 'Nombre' },
    { id: 'rif', label: 'Rif' },
    { id: 'email', label: 'Email' },
    { id: 'concept', label: 'Obtiene' },
    { id: 'value', label: 'Aplica', align: 'center' },
    { id: 'id', label: 'Opciones', align: 'right', sort: false },
]
export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Modelos',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const FORM_VALUES:Affiliation = {
  name: '',
  address: '',
  contact_person: '',
  credit_days: 15,
  credit_limit: 0.00,
  email: '',
  phone_number: '',
  postal_code: '',
  rif: '',  
  value: 0.00,
  concept: 'Descuento',
  is_active: true,
  price_type: "affiliated"
};

export const QUERY_KEYS = {
  list: 'affiliations',
};

export const CONCEPT_CHOICES = [
  {
    value: 'Descuento',
    label: 'Descuento',
  },
  {
    value: 'Incremento',
    label: 'Incremento',
  },
]

export const PRICE_TYPE = [
  {
    value: "standard",
    label: "Particular"
  },
  {
    value: "emergency",
    label: "Emergencia"
  },
  {
    value: "affiliated",
    label: "Seguro/empresa"
  },
  {
    value: "home_service",
    label: "Domicilio"
  },
  {
    value: "holiday",
    label: "Fin de semana y feriado"
  },
  {
    value: "exempt",
    label: "Exonerado"
  }
]