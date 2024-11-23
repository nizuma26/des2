import { Helmet } from 'react-helmet-async';

import MostRequestedLabTestsReport from '../../../../sections/reports/laboratory/most-requested-lab-tests';

const MostRequestedLabTestsReportPage = () => (
  <>
    <Helmet>
      <title>Resporte de examenes solicitados</title>
    </Helmet>
    <MostRequestedLabTestsReport />
  </>
);

export default MostRequestedLabTestsReportPage
