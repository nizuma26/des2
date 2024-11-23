import { Helmet } from 'react-helmet-async';

import { CreateTest } from '../../../sections/clinical-tests/tests';

// ----------------------------------------------------------------------

export default function TestAddPage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Examen | LabSystem </title>
      </Helmet>

      <CreateTest />
    </>
  );
}
