import { Helmet } from 'react-helmet-async';

import { CreateLaboratory } from '../../../sections/configuration/laboratory';

// ----------------------------------------------------------------------

export default function LaboratoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Laboratorio </title>
      </Helmet>

      <CreateLaboratory />
    </>
  );
}
