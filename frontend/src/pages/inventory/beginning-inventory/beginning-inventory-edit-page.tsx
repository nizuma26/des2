import { Helmet } from 'react-helmet-async';

import { EditBeginningInventory } from '../../../sections/inventory/beginning-inventory';

// ----------------------------------------------------------------------

export default function BeginningInventoryListPage() {
  return (
    <>
      <Helmet>
        <title> Edición de Inventario Inicial </title>
      </Helmet>

      <EditBeginningInventory />
    </>
  );
}
