import { Helmet } from 'react-helmet-async';

import { BankList } from '../../../sections/configuration/banks';

// ----------------------------------------------------------------------

export default function BankListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de bancos </title>
      </Helmet>

      <BankList />
    </>
  );
}
