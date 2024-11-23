import { Helmet } from 'react-helmet-async';

import EditPurchase from '../../../sections/procurement/purchase/edit';

// ----------------------------------------------------------------------

export default function PurchaseListPage() {
  return (
    <>
      <Helmet>
        <title> Editar Compras </title>
      </Helmet>

      <EditPurchase />
    </>
  );
}
