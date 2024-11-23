import { Helmet } from 'react-helmet-async';

import CreatePurchaseRequisition from '../../../sections/procurement/purchase-requisition/create';

const PurchaseRequisitionCreatePage = () => (
  <>
    <Helmet>
      <title>Nueva requisición</title>
    </Helmet>
    <CreatePurchaseRequisition />
  </>
);

export default PurchaseRequisitionCreatePage
