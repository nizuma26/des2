import { Helmet } from 'react-helmet-async';

import CreateOrder from '../../../sections/orders/orders/create';

// ----------------------------------------------------------------------

export default function OrderCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nueva orden </title>
      </Helmet>

      <CreateOrder />
    </>
  );
}
