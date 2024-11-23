import { Helmet } from 'react-helmet-async';

import PurchaseList from '../../../sections/procurement/purchase/list';

// ----------------------------------------------------------------------

export default function PurchaseListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Compras </title>
      </Helmet>

      <PurchaseList />
    </>
  );
}
