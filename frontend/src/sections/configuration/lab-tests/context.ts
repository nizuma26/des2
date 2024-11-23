import { Parameter } from '../../../types/configuration/lab-test';
import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'abbreviation', label: 'Código' },
  { id: 'name', label: 'Nombre' },
  { id: 'category', label: 'Categoría' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const ITEMS_TABLE_COLUMNS_DIALOG: Array<Columns> = [
  { id: 'item_name', label: 'Nombre' },
  { id: 'item_category', label: 'Categoría' },
  { id: 'stock', label: 'Existencias' },
  { id: 'price', label: 'Precio' },
]

export const ITEMS_TABLE_COLUMNS: Array<Columns> = [
  { id: 'item_id', label: '', align: "center", width: '2%', sort: false },
  { id: 'item_name', label: 'Nombre', sort: false },
  { id: 'quantity', label: 'Cantidad requerida', width: '22%', sort: false },
  { id: 'reduction_type', label: 'Tipo de reducción', sort: false },
]

export const PARAMETER_TABLE_COLUMNS: Array<Columns> = [
  { id: 'name', label: 'Nombre' },
  { id: 'measure_unit', label: 'Unidad de medida' },
  { id: 'parameter_type', label: 'Tipo', align: 'center' },
  { id: '', label: '', width: '10%', sort: false },
]

export const REFERENCE_VALUE_TABLE_COLUMNS: Array<Columns> = [
  { id: '', label: 'Acciones', width: '13%', sort: false },
  { id: 'name', label: 'Nombre' },
  { id: 'normal_value', label: 'Valores normales', align: 'center' },
]

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Examenes',
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
    name: 'Examenes',
    route: '/lab-test',
    type: 'link',
  },
  {
    name: 'Nuevo examen',
    type: 'typography',
  },
];

export const QUERY_KEYS = {
  list: 'lab-tests',
  items: 'lab-test-items'  
}

export const REFERENCE_VALUE = {
  name: '',
  min: null,
  max: null,
};

export const PARAM:Parameter = {
  name: '',
  parameter_type: 'number',
  measure_unit: '',
  options: [],
  reference_values: [],
  sub_parameters: [],
};

export const TYPE_PARAMETER = [
  {value: 'text', label: 'Texto'},
  {value: 'number', label: 'Numérico'},
  {value: 'select', label: 'Lista de opciones'},
  {value: 'composite', label: 'Compuesto'},
]

export const REDUCTION_TYPE = [
  {value: 'orden', label: 'Al registrar la orden'},
  {value: 'captura_resultados', label: 'Al cargar resultados'},
]