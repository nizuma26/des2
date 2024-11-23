import { Helmet } from 'react-helmet-async';

import LabTestProfileList from '../../../sections/configuration/lab-test-profile/list';

// ----------------------------------------------------------------------

export default function LabTestProfileListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de perfiles </title>
      </Helmet>

      <LabTestProfileList />
    </>
  );
}
