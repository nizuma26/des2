import { Helmet } from 'react-helmet-async';

import CurrencyList from '../../../sections/configuration/currency';

// ----------------------------------------------------------------------

export default function CurrencyListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de monedas </title>
      </Helmet>

      <CurrencyList />
    </>
  );
}
