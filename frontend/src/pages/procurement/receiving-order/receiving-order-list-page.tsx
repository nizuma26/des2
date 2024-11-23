import { Helmet } from 'react-helmet-async';

import { ReceivingOrderList } from '../../../sections/procurement/receiving-purchase';

const ReceivingPurchaseOrderListPage = () => (
  <>
    <Helmet>
      <title>Ordenes de compras pendientes</title>
    </Helmet>
    <ReceivingOrderList />
  </>
);

export default ReceivingPurchaseOrderListPage
