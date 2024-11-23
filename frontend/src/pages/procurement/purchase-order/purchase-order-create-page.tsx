import { Helmet } from 'react-helmet-async';

import { CreatePurchaseOrder } from '../../../sections/procurement/purchase-order';

const PurchaseOrderCreatePage = () => (
  <>
    <Helmet>
      <title>Nueva orden de compra</title>
    </Helmet>
    <CreatePurchaseOrder />
  </>
);

export default PurchaseOrderCreatePage
