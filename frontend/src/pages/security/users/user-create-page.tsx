import { Helmet } from 'react-helmet-async';

import { CreateUser } from '../../../sections/security/user';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Usuario | LabSystem </title>
      </Helmet>

      <CreateUser />
    </>
  );
}
