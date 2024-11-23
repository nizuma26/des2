import { Helmet } from 'react-helmet-async';

import { ItemCategoryList } from '../../../sections/inventory/category';

// ----------------------------------------------------------------------

export default function ItemCategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Categorías </title>
      </Helmet>

      <ItemCategoryList />
    </>
  );
}
