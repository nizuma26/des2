import { Helmet } from 'react-helmet-async';

import { UserList } from '../../../sections/security/user';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Usuarios | LabSystem </title>
      </Helmet>

      <UserList />
    </>
  );
}
