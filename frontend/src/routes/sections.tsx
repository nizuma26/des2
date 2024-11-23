import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import RequireAuth from '../auth/components/require-auth';
import ErrorBoundary, { RenderingBug } from '../components/error-boundary';

import { LoaderAnimated, LoadingScreen } from '../components/loader';
import ProtectedContent from '../auth/components/protected-content';

// ----------------------------------------------------------------------

//dashboard-component
export const DashboardLayout = lazy(() => import('../layouts/dashboard'));

//--------------------------------- Auth ----------------------------------

//Login
export const LoginPage = lazy(() => import('../pages/login'));

//--------------------------------- Home ----------------------------------
//Dashboard
export const IndexPage = lazy(() => import('../pages/app'));

//--------------------------------- Security ----------------------------------

//Users
export const UserListPage = lazy(() => import('../pages/security/users/user-list-page'));
export const UserCreatePage = lazy(() => import('../pages/security/users/user-create-page'));
export const UserEditPage = lazy(() => import('../pages/security/users/user-edit-page'));
//Roles
export const RoleCreatePage = lazy(() => import('../pages/security/roles/role-create-page'));
export const RoleEditPage = lazy(() => import('../pages/security/roles/role-edit-page'));
export const RoleListPage = lazy(() => import('../pages/security/roles/role-list-page'));

//--------------------------------- Configuration ----------------------------------

//Laboratories
export const LaboratoryListPage = lazy(
  () => import('../pages/configuration/laboratory/laboratory-list-page')
);
export const LaboratoryCreatePage = lazy(
  () => import('../pages/configuration/laboratory/laboratory-create-page')
);
export const LaboratoryEditPage = lazy(
  () => import('../pages/configuration/laboratory/laboratory-edit-page')
);
//LabTests
export const LabTestListPage = lazy(
  () => import('../pages/configuration/lab-tests/lab-test-list-page')
);
export const LabTestCreatePage = lazy(
  () => import('../pages/configuration/lab-tests/lab-test-create-page')
);
export const LabTestEditPage = lazy(
  () => import('../pages/configuration/lab-tests/lab-test-edit-page')
);
//Profiles
export const LabTestProfileListPage = lazy(
  () => import('../pages/configuration/lab-test-profile/lab-test-profile-list-page')
);
export const LabTestProfileCreatePage = lazy(
  () => import('../pages/configuration/lab-test-profile/lab-test-profile-create-page')
);
export const LabTestProfileEditPage = lazy(
  () => import('../pages/configuration/lab-test-profile/lab-test-profile-edit-page')
);
//Currency
export const CurrencyListPage = lazy(
  () => import('../pages/configuration/currency/currency-list-page')
);
//Cash Register
export const CashRegisterListPage = lazy(
  () => import('../pages/configuration/cash-register/cash-register-list-page')
);
//Taxes
export const TaxListPage = lazy(() => import('../pages/configuration/tax/tax-list-page'));
//Banks
export const BankListPage = lazy(() => import('../pages/configuration/bank/bank-list-page'));
//Samples
export const SampleListPage = lazy(() => import('../pages/configuration/samples/sample-list-page'));
//Containers
export const ContainerListPage = lazy(
  () => import('../pages/configuration/containers/container-list-page')
);
//Lab Test Categories
export const LabTestCategoryListPage = lazy(
  () => import('../pages/configuration/lab-test-categories/lab-test-categories-list-page')
);

//--------------------------------- Inventory ----------------------------------

//Items
export const ItemListPage = lazy(() => import('../pages/inventory/item/item-list-page'));
export const ItemCreatePage = lazy(() => import('../pages/inventory/item/item-create-page'));
export const ItemEditPage = lazy(() => import('../pages/inventory/item/item-edit-page'));
//Item Categories
export const ItemCategoryListPage = lazy(
  () => import('../pages/inventory/category/category-list-page')
);
//Brands
export const BrandListPage = lazy(() => import('../pages/inventory/brand/brand-list-page'));
//Models
export const ModelListPage = lazy(() => import('../pages/inventory/model/model-list-page'));
//Measure Units
export const MeasureUnitListPage = lazy(
  () => import('../pages/inventory/measure-unit/measure-unit-list-page')
);
//Beginning Inventory
export const BeginningInventoryListPage = lazy(
  () => import('../pages/inventory/beginning-inventory/beginning-inventory-list-page')
);
export const BeginningInventoryCreatePage = lazy(
  () => import('../pages/inventory/beginning-inventory/beginning-inventory-create-page')
);
export const BeginningInventoryEditPage = lazy(
  () => import('../pages/inventory/beginning-inventory/beginning-inventory-edit-page')
);

//--------------------------------- PROCUREMENT ----------------------------------

//Suppliers
export const SupplierListPage = lazy(
  () => import('../pages/procurement/supplier/supplier-list-page')
);
export const SupplierCreatePage = lazy(
  () => import('../pages/procurement/supplier/supplier-create-page')
);
export const SupplierEditPage = lazy(
  () => import('../pages/procurement/supplier/supplier-edit-page')
);
//Purchase Requisition
export const PurchaseRequisitionListPage = lazy(
  () => import('../pages/procurement/purchase-requisition/purchase-requisition-list-page')
);
export const PurchaseRequisitionCreatePage = lazy(
  () => import('../pages/procurement/purchase-requisition/purchase-requisition-create-page')
);
export const PurchaseRequisitionEditPage = lazy(
  () => import('../pages/procurement/purchase-requisition/purchase-requisition-edit-page')
);
//Purchase orders
export const GeneratePurchaseOrderPage = lazy(
  () => import('../pages/procurement/generate-purchase-order/generate-purchase-order-page')
);
export const PurchaseOrderListPage = lazy(
  () => import('../pages/procurement/purchase-order/purchase-order-list-page')
);
export const PurchaseOrderCreatePage = lazy(
  () => import('../pages/procurement/purchase-order/purchase-order-create-page')
);
//Receiving orders
export const ReceivingOrderListPage = lazy(
  () => import('../pages/procurement/receiving-order/receiving-order-list-page')
);
export const ReceivingOrderCreatePage = lazy(
  () => import('../pages/procurement/receiving-order/receiving-order-create-page')
);
export const ContinueReceptionPage = lazy(
  () => import('../pages/procurement/receiving-order/continue-reception-page')
);
//Accounts Payable
export const AccountPayableListPage = lazy(
  () => import('../pages/procurement/account-payable/account-payable-list-page')
);
//Approval Requisitions
export const PendingRequisitionsListPage = lazy(
  () => import('../pages/procurement/approvals/pending-requisitions-list-page')
);
export const ApprovalRequisitionPage = lazy(
  () => import('../pages/procurement/approvals/approval-requisition-page')
);

//--------------------------------- Orders ----------------------------------

//Patients
export const PatientListPage = lazy(() => import('../pages/orders/patients/patient-list-page'));
export const PatientCreatePage = lazy(() => import('../pages/orders/patients/patient-create-page'));
export const PatientEditPage = lazy(() => import('../pages/orders/patients/patient-edit-page'));
//Patient Affiliations
export const AffiliationListPage = lazy(
  () => import('../pages/orders/affiliations/affiliation-list-page')
);
//Patients
export const OrderListPage = lazy(() => import('../pages/orders/orders/order-list-page'));
export const OrderCreatePage = lazy(() => import('../pages/orders/orders/order-create-page'));
export const OrderDetailPage = lazy(() => import('../pages/orders/orders/order-detail-page'));
//Pending Orders
export const PendingOrderListPage = lazy(
  () => import('../pages/orders/results/pending-order-list-page')
);
//Billable Orders
export const BillableOrderListPage = lazy(
  () => import('../pages/orders/order-invoice/billable-order-list-page')
);

//--------------------------------- Reports ----------------------------------

export const IncomeSummaryReportPage = lazy(
  () => import('../pages/reports/income-summary/income-summary-report-page')
);
export const InventoryReportPage = lazy(
  () => import('../pages/reports/inventory/inventory-report-page')
);
export const PatientTreatedReportPage = lazy(
  () => import('../pages/reports/patients/patient-treated-report-page')
);
export const MostRequestedLabTestsReportPage = lazy(
  () => import('../pages/reports/laboratory/most-requested-lab-tests/most-requested-lab-tests-report-page')
);
//--------------------------------- Errors ----------------------------------

//errors
export const Page404 = lazy(() => import('../pages/error/page-not-found'));
export const Page403 = lazy(() => import('../pages/error/unauthorized-page'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ErrorBoundary fallback={<RenderingBug />}>
          <RequireAuth>
            <DashboardLayout>
              <Suspense fallback={<LoadingScreen />}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </RequireAuth>
        </ErrorBoundary>
      ),
      //PRIVATE ROUTES
      children: [
        //----- Index -----
        {
          children: [{ element: <IndexPage />, index: true }],
        },
        //----- Security Routes -----
        {
          path: 'user',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_user']} to="/unauthorized">
                  <UserListPage />             
                </ProtectedContent>
              ),
              index: true,
            }, // => '/user'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_user']} to="/unauthorized">
                  <UserCreatePage />
                </ProtectedContent>
              ),
            }, // => '/user/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_user']} to="/unauthorized">
                  <UserEditPage />
                </ProtectedContent>
          
              ),
            }, // => '/user/edit'
          ],
        },
        {
          path: 'role',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_user']} to="/unauthorized">
                  <RoleListPage />
                </ProtectedContent>
                
              ),
              index: true,
            }, // => '/role'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_user']} to="/unauthorized">
                  <RoleCreatePage />
                </ProtectedContent>
             
              ),
            }, // => '/role/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_user']} to="/unauthorized">
                  <RoleEditPage />
                </ProtectedContent>
              
              ),
            }, // => '/role/edit'
          ],
        },
        //----- Configuration Routes -----
        {
          path: 'laboratory',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_laboratory']} to="/unauthorized">                  
                  <LaboratoryListPage />
                </ProtectedContent>
        
              ),
              index: true,
            }, // => '/laboratory'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_laboratory']} to="/unauthorized">
                  <LaboratoryCreatePage />
                </ProtectedContent>
             
              ),
            }, // => '/laboratory/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_laboratory']} to="/unauthorized">
                  <LaboratoryEditPage />
                </ProtectedContent>
              ),
            }, // => '/laboratory/edit'
          ],
        },
        {
          path: 'lab-test',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_lab_test']} to="/unauthorized">
                  <LabTestListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/lab-test'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_lab_test']} to="/unauthorized">
                  <LabTestCreatePage />
                </ProtectedContent>
              ),
            }, // => '/lab-test/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_lab_test']} to="/unauthorized">
                  <LabTestEditPage />
                </ProtectedContent>
              ),
            }, // => '/lab-test/edit/:id'
            {
              path: 'profile',
              element: (
                <ProtectedContent perms={['view_lab_test']} to="/unauthorized">
                  <LabTestProfileListPage />
                </ProtectedContent>
              ),
            }, // => '/lab-test/profile'
            {
              path: 'profile/add',
              element: (
                <ProtectedContent perms={['add_lab_test']} to="/unauthorized">
                  <LabTestProfileCreatePage />
                </ProtectedContent>
              ),
            }, // => '/lab-test/profile/add'
            {
              path: 'profile/edit/:id',
              element: (
                <ProtectedContent perms={['change_lab_test']} to="/unauthorized">
                  <LabTestProfileEditPage />
                </ProtectedContent>
              ),
            }, // => '/lab-test/profile/edit/:id'
          ],
        },
        {
          path: 'lab-test-category',
          element: (
            <ProtectedContent perms={['view_lab_test_category']} to="/unauthorized">
              <LabTestCategoryListPage />
            </ProtectedContent>
          ), // => /lab-test-category
        },
        {
          path: 'sample',
          element: (
            <ProtectedContent perms={['view_samples']} to="/unauthorized">
              <SampleListPage />
            </ProtectedContent>
          ), // => /sample
        },
        {
          path: 'container',
          element: (
            <ProtectedContent perms={['view_containers']} to="/unauthorized">
              <ContainerListPage />
            </ProtectedContent>
          ), // => /container
        },
        {
          path: 'cash-register',
          element: (
            <ProtectedContent perms={['view_cash_register']} to="/unauthorized">
              <CashRegisterListPage />
            </ProtectedContent>
           
          ), // => /cash-register
        },
        {
          path: 'tax',
          element: (
            <ProtectedContent perms={['view_tax']} to="/unauthorized">
              <TaxListPage />
            </ProtectedContent>
          ), // => /tax
        },
        {
          path: 'bank',
          element: (
            <ProtectedContent perms={['view_tax']} to="/unauthorized">
              <BankListPage />
            </ProtectedContent>
          ), // => /banks
        },
        {
          path: 'currency',
          element: (
            <ProtectedContent perms={['view_currency']} to="/unauthorized">
              <CurrencyListPage />
            </ProtectedContent>
          ), // => /currency
        },
        //----- Orders Routes -----
        {
          path: 'patient',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_patient']} to="/unauthorized">
                  <PatientListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/patient'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_patient']} to="/unauthorized">
                  <PatientCreatePage />
                </ProtectedContent>
              ),
            }, // => '/patient/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_patient']} to="/unauthorized">
                  <PatientEditPage />
                </ProtectedContent>
              ),
            }, // => '/patient/edit'
          ],
        },
        {
          path: 'affiliation',
          element: (
            <ProtectedContent perms={['view_affiliation']} to="/unauthorized">
              <AffiliationListPage />
            </ProtectedContent>
          ), // => '/affiliation'
        },
        {
          path: 'order',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_orders']} to="/unauthorized">
                  <OrderListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/order'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_order']} to="/unauthorized">
                  <OrderCreatePage />
                </ProtectedContent>
              ),
            }, // => '/order/add'
            {
              path: 'detail/:id',
              element: (
                <ProtectedContent perms={['view_orders']} to="/unauthorized">
                  <OrderDetailPage />
                </ProtectedContent>
              ),
            }, // => '/order/detail/edit'
            // { path: 'edit/:id', element: <OrderEditPage /> }, // => '/order/edit'
          ],
        },
        {
          path: 'result',
          children: [
            {
              path: 'pending-orders',
              element: (
                <ProtectedContent perms={['view_result']} to="/unauthorized">
                  <PendingOrderListPage />
                </ProtectedContent>
              ),
            }, // => '/result/pending-orders'
            //{ path: 'detail/:id', element: <OrderDetailPage /> }, // => '/order/detail/edit'
            // { path: 'edit/:id', element: <OrderEditPage /> }, // => '/order/edit'
          ],
        },
        {
          path: 'generate-order-invoice',
          element: (
            <ProtectedContent perms={['view_orders']} to="/unauthorized">
              <BillableOrderListPage />
            </ProtectedContent>
          ),
          index: true
        },
        {
          path: 'item-category',
          element: (
            <ProtectedContent perms={['view_item_category']} to="/unauthorized">
              <ItemCategoryListPage />
            </ProtectedContent>
          ), // => '/item-category'
        },
        {
          path: 'brand',
          element: (
            <ProtectedContent perms={['view_brand']} to="/unauthorized">
              <BrandListPage />
            </ProtectedContent>
          ), // => '/brand'
        },
        {
          path: 'model',
          element: (
            <ProtectedContent perms={['view_model']} to="/unauthorized">
              <ModelListPage />
            </ProtectedContent>
          ), // => '/model'
        },
        {
          path: 'measure-unit',
          element: (
            <ProtectedContent perms={['view_unit_measure']} to="/unauthorized">
              <MeasureUnitListPage />
            </ProtectedContent>
          ), // => '/measure-unit'
        },
        {
          path: 'item',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_item']} to="/unauthorized">
                  <ItemListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/item'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_item']} to="/unauthorized">
                  <ItemCreatePage />
                </ProtectedContent>
              ),
            }, // => '/item/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_item']} to="/unauthorized">
                  <ItemEditPage />
                </ProtectedContent>
              ),
            }, // => '/item/edit'
          ],
        },
        {
          path: 'beginning-inventory',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_beginning_inventory']} to="/unauthorized">
                  <BeginningInventoryListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/beginning-inventory'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_beginning_inventory']} to="/unauthorized">
                  <BeginningInventoryCreatePage />
                </ProtectedContent>
              ),
            }, // => '/beginning-inventory/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_beginning_inventory']} to="/unauthorized">
                  <BeginningInventoryEditPage />
                </ProtectedContent>
              ),
            }, // => '/beginning-inventory/edit'
          ],
        },
        //----- Procurement Routes -----
        {
          path: 'supplier',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_supplier']} to="/unauthorized">
                  <SupplierListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/supplier'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_supplier']} to="/unauthorized">
                  <SupplierCreatePage />
                </ProtectedContent>
              ),
            }, // => '/supplier/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_supplier']} to="/unauthorized">
                  <SupplierEditPage />
                </ProtectedContent>
              ),
            }, // => '/supplier/edit'
          ],
        },
        {
          path: 'purchase-requisition',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_purchase_requisition']} to="/unauthorized">
                  <PurchaseRequisitionListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/purchase-requisition'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_purchase_requisition']} to="/unauthorized">
                  <PurchaseRequisitionCreatePage />
                </ProtectedContent>
              ),
            }, // => '/purchase-requisition/add'
            {
              path: 'edit/:id',
              element: (
                <ProtectedContent perms={['change_purchase_requisition']} to="/unauthorized">
                  <PurchaseRequisitionEditPage />
                </ProtectedContent>
              ),
            }, // => '/purchase-requisition/edit/:id'
            {
              path: 'generate/:id',
              element: (
                <ProtectedContent perms={['add_purchase_order']} to="/unauthorized">
                  <GeneratePurchaseOrderPage />
                </ProtectedContent>
              ),
            }, // => '/purchase-requisition/edit/:id'
          ],
        },
        {
          path: 'approval-requisitions',
          children: [
            {
              element: (
                <ProtectedContent perms={['approve_purchase_requisition']} to="/unauthorized">
                  <PendingRequisitionsListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/pending-requisitions'
            {
              path: 'approval/:id',
              element: (
                <ProtectedContent perms={['approve_purchase_requisition']} to="/unauthorized">
                  <ApprovalRequisitionPage />
                </ProtectedContent>
              ),
            }, // => 'pending-requisitions/approve/:id'
          ],
        },
        {
          path: 'purchase-order',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_purchase_order']} to="/unauthorized">
                  <PurchaseOrderListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/purchase-order'
            {
              path: 'add',
              element: (
                <ProtectedContent perms={['add_purchase_order']} to="/unauthorized">
                  <PurchaseOrderCreatePage />
                </ProtectedContent>
              ),
            }, // => '/purchase-order/add'
            //{ path: 'edit/:id', element: <PurchaseOrderEditPage /> }, // => '/purchase-order/edit'
          ],
        },
        {
          path: 'receiving-purchase-order',
          children: [
            {
              element: (
                <ProtectedContent perms={['view_receiving_order']} to="/unauthorized">
                  <ReceivingOrderListPage />
                </ProtectedContent>
              ),
              index: true,
            }, // => '/receiving-purchase-order'
            {
              path: 'add/:id',
              element: (
                <ProtectedContent perms={['add_receiving_order']} to="/unauthorized">
                  <ReceivingOrderCreatePage />
                </ProtectedContent>
              ),
            }, // => '/receiving-purchase-order/create/:orderId'
            {
              path: 'continue/:id',
              element: (
                <ProtectedContent perms={['change_receiving_order']} to="/unauthorized">
                  <ContinueReceptionPage />
                </ProtectedContent>
              ),
            }, // => '/receiving-purchase-order/create/:orderId'
          ],
        },
        {
          path: 'account-payable',
          element: (
            <ProtectedContent perms={['view_account_payable']} to="/unauthorized">
              <AccountPayableListPage />
            </ProtectedContent>
          ),
          index: true,
        },
        // ----- reports ------
        {
          path: 'income-summary',
          element: <IncomeSummaryReportPage />, // => '/income-summary'
        },
        {
          path: 'stocks',
          element: <InventoryReportPage />, // => '/stocks'
        },
        {
          path: 'patient-treated',
          element: <PatientTreatedReportPage />, // => '/patient-treated'
        },
        {
          path: 'most-request-lab-test',
          element: <MostRequestedLabTestsReportPage />, // => '/patient-treated'
        },
      ],
    },
    //PUBLIC ROUTES
    {
      path: 'login',
      element: (
        <Suspense fallback={<LoaderAnimated />}>
          <LoginPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'unauthorized',
      element: <Page403 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
