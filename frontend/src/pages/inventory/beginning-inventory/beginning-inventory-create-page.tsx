import { Helmet } from 'react-helmet-async';

import { CreateBeginningInventory } from '../../../sections/inventory/beginning-inventory';

// ----------------------------------------------------------------------

export default function BeginningInventoryListPage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Inventario Inicial </title>
      </Helmet>

      <CreateBeginningInventory />
    </>
  );
}
