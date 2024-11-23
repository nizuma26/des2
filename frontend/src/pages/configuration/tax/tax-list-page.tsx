import { Helmet } from 'react-helmet-async';

import { TaxList } from '../../../sections/configuration/tax';

// ----------------------------------------------------------------------

export default function TaxListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de impuestos </title>
      </Helmet>

      <TaxList />
    </>
  );
}
