import { Helmet } from 'react-helmet-async';

import { CashRegisterList } from '../../../sections/configuration/cash-register';

// ----------------------------------------------------------------------

export default function CashRegisterListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de cajas </title>
      </Helmet>

      <CashRegisterList />
    </>
  );
}
