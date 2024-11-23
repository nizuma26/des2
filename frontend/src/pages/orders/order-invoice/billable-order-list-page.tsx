import { Helmet } from 'react-helmet-async';

import { BillableOrderList } from '../../../sections/orders/order-invoice';

// ----------------------------------------------------------------------

export default function BillableOrderListPage() {
  return (
    <>
      <Helmet>
        <title> Facturar Ordenes </title>
      </Helmet>

      <BillableOrderList />
    </>
  );
}
