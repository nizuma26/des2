import { Helmet } from 'react-helmet-async';

import { PurchaseOrderList } from '../../../sections/procurement/purchase-order';

const PurchaseOrderListPage = () => (
  <>
    <Helmet>
      <title>Listado de ordenes de compras</title>
    </Helmet>
    <PurchaseOrderList />
  </>
);

export default PurchaseOrderListPage
