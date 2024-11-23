import { Helmet } from 'react-helmet-async';

import EditLabTest from '../../../sections/configuration/lab-tests/edit';

// ----------------------------------------------------------------------

export default function LabTestEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar examen </title>
      </Helmet>

      <EditLabTest />
    </>
  );
}
