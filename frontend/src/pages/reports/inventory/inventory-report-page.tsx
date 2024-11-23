import { Helmet } from 'react-helmet-async';

import { InventoryReport } from '../../../sections/reports/inventory';

const InventoryReportPage = () => (
  <>
    <Helmet>
      <title>Resumen de ingresos</title>
    </Helmet>
    <InventoryReport />
  </>
);

export default InventoryReportPage
