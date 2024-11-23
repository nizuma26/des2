import { Helmet } from 'react-helmet-async';

import { PurchaseRequisitionList } from '../../../sections/procurement/purchase-requisition';

const PurchaseRequisitionListPage = () => (
  <>
    <Helmet>
      <title>Listado de requisiciones</title>
    </Helmet>
    <PurchaseRequisitionList />
  </>
);

export default PurchaseRequisitionListPage
