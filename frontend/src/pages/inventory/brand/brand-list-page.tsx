import { Helmet } from 'react-helmet-async';

import BrandList from '../../../sections/inventory/brand';

// ----------------------------------------------------------------------

export default function BrandListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Marcas </title>
      </Helmet>

      <BrandList />
    </>
  );
}
