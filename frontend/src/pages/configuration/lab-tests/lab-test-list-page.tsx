import { Helmet } from 'react-helmet-async';

import { LabTestList } from '../../../sections/configuration/lab-tests';

// ----------------------------------------------------------------------

export default function LabTestListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Examenes </title>
      </Helmet>

      <LabTestList />
    </>
  );
}
