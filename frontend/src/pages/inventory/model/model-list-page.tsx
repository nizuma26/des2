import { Helmet } from 'react-helmet-async';

import ModelList from '../../../sections/inventory/model';

// ----------------------------------------------------------------------

export default function ModelListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Modelos </title>
      </Helmet>

      <ModelList />
    </>
  );
}
