import { Helmet } from 'react-helmet-async';

import CreateItem from '../../../sections/inventory/item/create';

// ----------------------------------------------------------------------

export default function ItemCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Artículo | LabSystem </title>
      </Helmet>

      <CreateItem />
    </>
  );
}
