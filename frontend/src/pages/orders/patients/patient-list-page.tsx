import { Helmet } from 'react-helmet-async';

import PatientList from '../../../sections/orders/patients/list';

// ----------------------------------------------------------------------

export default function PatientListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Pacientes </title>
      </Helmet>

      <PatientList />
    </>
  );
}
