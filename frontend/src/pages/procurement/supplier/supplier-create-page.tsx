import { Helmet } from 'react-helmet-async';

import { CreateSupplier } from '../../../sections/procurement/supplier';

// ----------------------------------------------------------------------

export default function SupplierCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Proveedor </title>
      </Helmet>

      <CreateSupplier />
    </>
  );
}
