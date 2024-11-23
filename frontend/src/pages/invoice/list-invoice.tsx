import { Helmet } from 'react-helmet-async';

import { InvoiceView } from '../../sections/invoice/';

// ----------------------------------------------------------------------

export default function InvoicePage() {

  return (
    <>
      <Helmet>
        <title> Listado de Facturas | LabSystem </title>
      </Helmet>

      <InvoiceView />
    </>
  );
}
