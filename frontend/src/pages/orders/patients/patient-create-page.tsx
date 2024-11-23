import { Helmet } from 'react-helmet-async';

import CreatePatient from '../../../sections/orders/patients/create';

// ----------------------------------------------------------------------

export default function PatientCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Paciente </title>
      </Helmet>

      <CreatePatient />
    </>
  );
}
