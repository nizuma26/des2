import { Helmet } from 'react-helmet-async';

import { EditUser } from '../../../sections/security/user';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar Usuario | LabSystem </title>
      </Helmet>

      <EditUser />
    </>
  );
}
