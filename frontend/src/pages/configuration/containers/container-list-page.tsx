import { Helmet } from 'react-helmet-async';

import { ContainerList } from '../../../sections/configuration/containers';

// ----------------------------------------------------------------------

export default function ContainerListPage() {
  return (
    <>
      <Helmet>
        <title> Catálogo de contenedores </title>
      </Helmet>

      <ContainerList />
    </>
  );
}
