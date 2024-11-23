import { Helmet } from 'react-helmet-async';

import ApprovalRequisition from '../../../sections/procurement/approvals/approval-requisition';

const ApprovalRequisitionPage = () => (
  <>
    <Helmet>
      <title>Aprobar requisición</title>
    </Helmet>
    <ApprovalRequisition />
  </>
);

export default ApprovalRequisitionPage