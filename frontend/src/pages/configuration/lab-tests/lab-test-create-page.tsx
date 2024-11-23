import { Helmet } from 'react-helmet-async';

import CreateLabTest from '../../../sections/configuration/lab-tests/create';

// ----------------------------------------------------------------------

export default function LabTestCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo examen </title>
      </Helmet>

      <CreateLabTest />
    </>
  );
}
