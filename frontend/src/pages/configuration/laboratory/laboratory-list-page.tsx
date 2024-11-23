import { Helmet } from 'react-helmet-async';

import { LaboratoryList } from '../../../sections/configuration/laboratory';

// ----------------------------------------------------------------------

export default function LaboratoryListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Laboratorios </title>
      </Helmet>

      <LaboratoryList />
    </>
  );
}
