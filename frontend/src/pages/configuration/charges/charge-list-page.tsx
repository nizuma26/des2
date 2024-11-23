import { Helmet } from 'react-helmet-async';

import ChargeList from '../../../sections/configuration/charges';

// ----------------------------------------------------------------------

export default function ChargeListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de cargos </title>
      </Helmet>

      <ChargeList />
    </>
  );
}
