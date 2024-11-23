import { Helmet } from 'react-helmet-async';

import { IncomeSummaryReport } from '../../../sections/reports/income-summary';

const IncomeSummaryReportPage = () => (
  <>
    <Helmet>
      <title>Resumen de ingresos</title>
    </Helmet>
    <IncomeSummaryReport />
  </>
);

export default IncomeSummaryReportPage
