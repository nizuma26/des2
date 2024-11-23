import { Helmet } from 'react-helmet-async';

import EditItem from '../../../sections/inventory/item/edit';

// ----------------------------------------------------------------------

export default function ItemEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar Artículo </title>
      </Helmet>

      <EditItem />
    </>
  );
}
