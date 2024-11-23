import { Helmet } from 'react-helmet-async';

import { EditRole } from '../../../sections/security/roles';

// ----------------------------------------------------------------------

export default function RoleEditPage() {
  return (
    <>
      <Helmet>
        <title> Editar Rol | LabSystem </title>
      </Helmet>

      <EditRole />
    </>
  );
}
