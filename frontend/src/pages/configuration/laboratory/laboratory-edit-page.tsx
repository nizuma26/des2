import { Helmet } from 'react-helmet-async';

import { EditLaboratory } from '../../../sections/configuration/laboratory';

// ----------------------------------------------------------------------

export default function LaboratoryEditPage() {
  return (
    <>
      <Helmet>
        <title> Edición de Laboratorio </title>
      </Helmet>

      <EditLaboratory />
    </>
  );
}
