import { SvgColor } from '../../components/svg-color/svg-color';
import { NavData } from './common/navigation/types';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 22, height: 22 }} />
);

export const navConfig:NavData[] = [
  {
    title: 'Inicio',
    icon: icon('ic_home'),
    children: [
      {
        key: 'home-dashboard',
        title: 'Panel principal',
        path: '/',
        icon: icon('ic_analytics'),
        permissions: []
      },
    ],
  },
  {
    title: 'Ordenes',
    icon: icon('ic_upload_result'),
    children: [
      {
        key: 'gest_patient',
        title: 'pacientes',
        path: '/patient',
        icon: icon('ic_patients'),
        permissions: ['view_patient'],
      },
      {
        key: 'patient_affiliations',
        title: 'Empresas',
        path: '/affiliation',
        icon: icon('ic_expenses'),
        permissions: ['view_affiliation'],
      },
      {
        key: 'lab_order',
        title: 'Gestion de ordenes',
        path: '/order',
        icon: icon('ic_order'),
        permissions: ['view_orders'],
      },
      {
        key: 'lab_result',
        title: 'Procesar Ordenes',
        path: '/result/pending-orders',
        icon: icon('ic_upload_result'),
        permissions: ['view_result'],
      },
      {
        key: 'generate_invoice',
        title: 'Facturar Orden',
        path: '/generate-order-invoice',
        icon: icon('ic_invoice'),
        permissions: [],
      },      
    ],
  },
  {
    title: 'Inventario',
    icon: icon('ic_inventory'),
    children: [
      {
        key: 'inv-item',
        title: 'artículos',
        path: '/item',
        icon: icon('ic_product_virtual'),
        permissions: ['view_item'],
      },
      {
        key: 'inv-category',
        title: 'categorías',
        path: '/item-category',
        icon: icon('ic_label'),
        permissions: ['view_item_category'],
      },
      {
        key: 'inv-brand',
        title: 'marcas',
        path: '/brand',
        icon: icon('ic_tag'),
        permissions: ['view_brand'],
      },
      {
        key: 'inv-model',
        title: 'modelos',
        path: '/model',
        icon: icon('ic_tag'),
        permissions: ['view_model'],
      },
      {
        key: 'inv-measure-unit',
        title: 'unidad de medida',
        path: '/measure-unit',
        icon: icon('ic_fluent_ruler'),
        permissions: ['view_unit_measure'],
      },
      {
        key: 'inv-beginning-inventory',
        title: 'inventario inicial',
        path: '/beginning-inventory',
        icon: icon('ic_beginning_inventory'),
        permissions: ['view_beginning_inventory'],
      },
      {
        key: 'inv-inventory-adjustment',
        title: 'ajuste de inventario',
        path: '/inventory-adjustment',
        icon: icon('ic_stock_settings'),
        permissions: ['view_adjustment'],
      },
    ],
  },
  {
    title: 'Adquisiciones',
    icon: icon('ic_cart'),
    children: [
      {
        key: 'proc_supplier',
        title: 'proveedores',
        path: '/supplier',
        icon: icon('ic_supplier'),
        permissions: ['view_supplier'],
      },
      {
        key: 'proc_purchace',
        title: 'Requisicion de compra',
        path: '/purchase-requisition',
        icon: icon('ic_cart'),
        permissions: ['view_purchase_requisition'],
      },
      {
        key: 'proc_approvals',
        title: 'Aprobar requisición',
        icon: icon('ic_approvals'),
        path: '/approval-requisitions',
        permissions: ['view_approvals'],
      },
      {
        key: 'proc_purchace_order',
        title: 'órdenes de compras',
        path: '/purchase-order',
        icon: icon('ic_purchase_order'),
        permissions: ['view_purchase_order'],
      },
      {
        key: 'proc_receive',
        title: 'Recepción de  Compras',
        icon: icon('ic_receive'),
        path: '/receiving-purchase-order',
        permissions: ['view_receiving_order'],
      },
      {
        key: 'proc_account_payable',
        title: 'cuentas por pagar',
        path: '/account-payable',
        icon: icon('ic_bill_to_pay'),
        permissions: ['view_account_payable'],
      },
    ],
  },
  {
    title: 'Configuración',
    icon: icon('ic_settings'),
    children: [
      {
        key: 'conf_lab',
        title: 'Laboratorios',
        icon: icon('ic_lab'),
        path: '/laboratory',
        permissions: ['view_laboratory'],
      },
      {
        key: 'conf_lab_test',
        title: 'Examenes',
        path: '/lab-test',
        icon: icon('ic_tests'),
        permissions: ['view_lab_test'],
      },
      {
        key: 'conf_lab_test_profile',
        title: 'Perfiles',
        path: '/lab-test/profile',
        icon: icon('ic_tests'),
        permissions: ['view_lab_test'],
      },
      {
        key: 'conf_lab_test_category',
        title: 'Categorías de examen',
        path: '/lab-test-category',
        icon: icon('ic_tests'),
        permissions: ['view_lab_test_category'],
      },
      {
        key: 'conf_sample',
        title: 'Muestras',
        path: '/sample',
        icon: icon('ic_tests'),
        permissions: ['view_samples'],
      },
      {
        key: 'conf_container',
        title: 'Contenedores',
        path: '/container',
        icon: icon('ic_tests'),
        permissions: ['view_containers'],
      },
      {
        key: 'conf_cash_register',
        title: 'cajas',
        path: '/cash-register',
        icon: icon('ic_cash_register_fill'),
        permissions: ['view_cash_register'],
      },
      {
        key: 'conf_bank',
        title: 'Bancos',
        path: '/bank',
        icon: icon('ic_tax'),
        permissions: ['view_bank'],
      },
      {
        key: 'conf_taxes',
        title: 'Impuestos',
        path: '/tax',
        icon: icon('ic_tax'),
        permissions: ['view_tax'],
      },
      {
        key: 'conf_currency',
        title: 'Monedas',
        path: '/currency',
        icon: icon('ic_currency'),
        permissions: ['view_currency'],
      },
    ],
  },
  {
    title: 'Seguridad',
    icon: icon('ic_user_roles'),
    children: [
      {
        key: 'sec_role',
        title: 'roles & permisos',
        icon: icon('ic_user_roles'),
        path: '/role',
        permissions: ['view_user'],
      },
      {
        key: 'sec_user',
        title: 'usuarios',
        icon: icon('ic_user'),
        path: '/user',
        permissions: ['view_user'],
      },
    ],
  },
  {
    title: 'Reportes',
    icon: icon('ic_cash_register'),
    children: [
      {
        key: '1_finanzas',
        title: 'Finanzas',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: '1_ingresos',
            title: 'Resumen de ingresos',
            path: '/income-summary',
            permissions: ['view_asdasd']
          },
          {
            key: '2_gastos',
            title: 'Resumen de gastos',
            path: '/approval-requisitions',
          },
        ],
      },
      {
        key: '1_inventory',
        title: 'Almacen',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: '1_stocks',
            title: 'Consultar inventario',
            path: '/stocks',
          },
        ],
      },
      {
        key: '1_orders',
        title: 'Ordenes',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: 'orderSummary',
            title: 'Resumen Total de ordenes',
            path: '/total-order-summary',
          },
          {
            key: 'orderByCompany',
            title: 'Ordenes por Empresa',
            path: '/order-by-company',
          },
        ],
      },
      {
        key: '1_pacientes',
        title: 'Pacientes',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: '1_pacientes',
            title: 'Pacientes atendidos',
            path: '/patient-treated',
          },
          {
            key: '3_deudas',
            title: 'Pacientes con deudas',
            path: '/approval-requisitions',
          },
        ],
      },
      {
        key: '1_laboratorio',
        title: 'Laboratorio',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: '1_examenes',
            title: 'Examenes mas solicitados',
            path: '/most-request-lab-test',
          },
          {
            key: '2_resultados',
            title: 'Examenes procesados ',
            path: '#',
          },
        ],
      },
      {
        key: '1_compras',
        title: 'Compras',
        icon: icon('ic_cash_register'),
        children: [
          {
            key: '1_ordenes',
            title: 'Ordenes de compra',
            path: '/approval-orders',
          },
          {
            key: '2_cuentas',
            title: 'Cuentas por pagar',
            path: '/approval-requisitions',
          },
        ],
      },
    ],
  },
];
