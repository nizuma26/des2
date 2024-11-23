import { Helmet } from 'react-helmet-async';

import OrderList from '../../../sections/orders/orders/list';

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de ordenes </title>
      </Helmet>

      <OrderList />
    </>
  );
}
