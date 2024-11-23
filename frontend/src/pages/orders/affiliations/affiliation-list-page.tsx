import { Helmet } from 'react-helmet-async';

import { AffiliationList } from '../../../sections/orders/affiliations';

// ----------------------------------------------------------------------

export default function AffiliationListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Afiliaciones </title>
      </Helmet>

      <AffiliationList />
    </>
  );
}
