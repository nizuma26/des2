import { Helmet } from 'react-helmet-async';

import CreateLabTestProfile from '../../../sections/configuration/lab-test-profile/create';

// ----------------------------------------------------------------------

export default function LabTestCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo perfil </title>
      </Helmet>

      <CreateLabTestProfile />
    </>
  );
}
