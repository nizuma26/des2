import { Helmet } from 'react-helmet-async';

import { BeginningInventoryList } from '../../../sections/inventory/beginning-inventory';

// ----------------------------------------------------------------------

export default function BeginningInventoryListPage() {
  return (
    <>
      <Helmet>
        <title> Inventario Inicial </title>
      </Helmet>

      <BeginningInventoryList />
    </>
  );
}
