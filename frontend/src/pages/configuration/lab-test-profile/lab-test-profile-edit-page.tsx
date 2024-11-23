import { Helmet } from 'react-helmet-async';

import EditLabTestProfile from '../../../sections/configuration/lab-test-profile/edit';

// ----------------------------------------------------------------------

export default function LabTestProfileEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar examen </title>
      </Helmet>

      <EditLabTestProfile />
    </>
  );
}
