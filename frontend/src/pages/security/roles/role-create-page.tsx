import { Helmet } from 'react-helmet-async';

import { CreateRole } from '../../../sections/security/roles';

// ----------------------------------------------------------------------

export default function RoleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Nuevo Rol | LabSystem </title>
      </Helmet>

      <CreateRole />
    </>
  );
}
