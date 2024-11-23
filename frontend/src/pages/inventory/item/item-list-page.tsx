import { Helmet } from 'react-helmet-async';

import ItemList from '../../../sections/inventory/item/list';

// ----------------------------------------------------------------------

export default function ItemListPage() {
  return (
    <>
      <Helmet>
        <title> Artículos | LabSystem </title>
      </Helmet>

      <ItemList />
    </>
  );
}
