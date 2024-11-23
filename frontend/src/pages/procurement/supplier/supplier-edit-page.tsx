import { Helmet } from 'react-helmet-async';

import { EditSupplier } from '../../../sections/procurement/supplier';

// ----------------------------------------------------------------------

export default function SupplierEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar Proveedor </title>
      </Helmet>

      <EditSupplier />
    </>
  );
}
