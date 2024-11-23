import { Helmet } from 'react-helmet-async';

import EditPatient from '../../../sections/orders/patients/edit';

// ----------------------------------------------------------------------

export default function PatientEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar paciente </title>
      </Helmet>

      <EditPatient />
    </>
  );
}
