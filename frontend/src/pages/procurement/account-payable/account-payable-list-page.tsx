import { Helmet } from 'react-helmet-async';

import { AccountsPayableList } from '../../../sections/procurement/account-payable';

const AccountPayableListPage = () => (
  <>
    <Helmet>
      <title>Cuentas por pagar</title>
    </Helmet>
    <AccountsPayableList />
  </>
);

export default AccountPayableListPage