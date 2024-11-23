import { Helmet } from 'react-helmet-async';

import { SampleList } from '../../../sections/configuration/samples';

// ----------------------------------------------------------------------

export default function SampleListPage() {
  return (
    <>
      <Helmet>
        <title> Catálogo de muestras </title>
      </Helmet>

      <SampleList />
    </>
  );
}
