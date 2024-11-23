import { Columns } from '../../../types/ui';
import { LabTestProfileFormValues } from '../../../types/configuration/lab-test-profile';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'abbreviation', label: 'Código' },
  { id: 'name', label: 'Nombre' },
  { id: 'category', label: 'Categoría' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const LAB_TEST_TABLE_COLUMNS: Array<Columns> = [
  { id: 'name', label: 'Nombre' },
  { id: 'price1', label: 'Precio' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Perfiles',
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
    name: 'Perfiles',
    route: '/lab-test/profile',
    type: 'link',
  },
  {
    name: 'Nuevo perfil',
    type: 'typography',
  },
];

export const QUERY_KEYS = {
  list: 'lab-test-profile',
  labTest: 'lab-tests'
}

export const DEFAULT_VALUES: LabTestProfileFormValues = {
  abbreviation: '',
  name: '',
  category: null,
  description: '',
  indications: '',
  prices: {
    standard: 0.00,
    emergency: 0.00,
    affiliated: 0.00,
    home_service: 0.00,
    holiday: 0.00,
  },
  lab_tests: []
};
