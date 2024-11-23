import { Helmet } from 'react-helmet-async';

import { RoleList } from '../../../sections/security/roles';

// ----------------------------------------------------------------------

export default function RoleEditPage() {
  return (
    <>
      <Helmet>
        <title> Listado de Roles | LabSystem </title>
      </Helmet>

      <RoleList />
    </>
  );
}
