import { Helmet } from 'react-helmet-async';

import { SupplierList } from '../../../sections/procurement/supplier';

// ----------------------------------------------------------------------

export default function SupplierListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Proveedores </title>
      </Helmet>

      <SupplierList />
    </>
  );
}
