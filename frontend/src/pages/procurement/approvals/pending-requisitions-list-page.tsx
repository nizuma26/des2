import { Helmet } from 'react-helmet-async';

import PendingRequisitions from '../../../sections/procurement/approvals/pending-requisitions';

const PendingRequisitionsListPage = () => (
  <>
    <Helmet>
      <title>Requisiciones pendientes</title>
    </Helmet>
    <PendingRequisitions />
  </>
);

export default PendingRequisitionsListPage