import { Helmet } from 'react-helmet-async';

import { GeneratePurchaseOrder } from '../../../sections/procurement/generate-purchase-order';

const GeneratePurchaseOrderPage = () => (
  <>
    <Helmet>
      <title>Generar orden de compra</title>
    </Helmet>
    <GeneratePurchaseOrder />
  </>
);

export default GeneratePurchaseOrderPage
