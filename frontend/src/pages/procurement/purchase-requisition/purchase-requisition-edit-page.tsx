import { Helmet } from 'react-helmet-async';

import EditPurchaseRequisition from '../../../sections/procurement/purchase-requisition/edit';

const PurchaseRequisitionEditPage = () => (
  <>
    <Helmet>
      <title>Editar requisición</title>
    </Helmet>
    <EditPurchaseRequisition />
  </>
);

export default PurchaseRequisitionEditPage
