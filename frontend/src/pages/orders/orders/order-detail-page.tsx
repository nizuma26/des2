import { Helmet } from 'react-helmet-async';

import OrderDetailSection from '../../../sections/orders/orders/order-detail-section';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  return (
    <>
      <Helmet>
        <title> Detalle paciente </title>
      </Helmet>

      <OrderDetailSection />
    </>
  );
}
