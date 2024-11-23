import { CurrencyFormValues } from '../../../types/configuration/currency';
import { Columns } from '../../../types/ui';

export const TABLE_COLUMNS: Array<Columns> = [
  { id: 'code', label: 'Código' },
  { id: 'name', label: 'Nombre' },
  { id: 'exchange_rate', label: 'Tasa de cambio', align: 'center' },
  { id: 'id', label: 'Opciones', align: 'right', sort: false },
];

export const BREADCRUMB_LIST_PAGE = [
  {
    name: 'Dashboard',
    route: '/',
    type: 'link',
  },
  {
    name: 'Monedas',
    type: 'typography',
  },
  {
    name: 'Listado',
    type: 'typography',
  },
];

export const FORM_VALUES:CurrencyFormValues = {
  code: '',
  name: '',
  symbol: '',
  exchange_rate: null,
  is_active: true,
  type_currency: null,
  is_foreign: false,
  with_tax: false,
  tax: null
};

export const QUERY_KEYS = {
  enabled: 'enabledCurrencies',
  disabled: 'disabledCurrencies',
  exchangeRate: 'exchange-rate'
}

export const TYPE_CURRENCY = [
  {value: null, label: "-------"},
  {value: "Principal", label: "Principal"},
  {value: "Secundaria", label: "Secundaria"},
]
