import { Helmet } from 'react-helmet-async';

import CreatePurchase from '../../../sections/procurement/purchase/create';

// ----------------------------------------------------------------------

export default function PurchaseListPage() {
  return (
    <>
      <Helmet>
        <title> Nueva Compras </title>
      </Helmet>

      <CreatePurchase />
    </>
  );
}
