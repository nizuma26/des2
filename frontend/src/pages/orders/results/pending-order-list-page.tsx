import { Helmet } from 'react-helmet-async';

import { PendingOrderList } from '../../../sections/orders/results';

// ----------------------------------------------------------------------

export default function PendingOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Ordenes Pendientes </title>
      </Helmet>

      <PendingOrderList />
    </>
  );
}
