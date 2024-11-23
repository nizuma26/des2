import { Helmet } from 'react-helmet-async';

import { PatientTreatedReport } from '../../../sections/reports/patient/';

const PatientTreatedReportPage = () => (
  <>
    <Helmet>
      <title>Pacientes Atendidos</title>
    </Helmet>
    <PatientTreatedReport />
  </>
);

export default PatientTreatedReportPage
