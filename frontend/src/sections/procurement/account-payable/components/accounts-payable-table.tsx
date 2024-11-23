import { useMemo, useState } from 'react';

import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Radio from '@mui/material/Radio';

import { AccountPayableList } from './types';

import { useGetData } from '../../../../hooks/use-get-data';

import { ACCOUNT_PAYABLE_COLUMNS, QUERY_KEYS } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import PaymentsTable from './payments-table';
import PaymentDialogForm from './payment-dialog-form';

// -------------------------------------------------------------------------------

interface AccountsPayableTableProps {
  supplierId: number;
  toolbarSx?: SxProps;
}

function AccountsPayableTable({ supplierId, toolbarSx }: AccountsPayableTableProps) {
  const { data = [], isFetching } = useGetData({
    url: `api/procurement/account-payable/?supplier_id=${supplierId}`,
    queryKey: [QUERY_KEYS.ACCOUNT_PAYABLE, supplierId],
    enabled: !!supplierId,
  });

  const [accountId, setAccount] = useState<number | null>(null);

  const totalDebt = useMemo(
    () =>
      data.reduce(
        (previousValue: number, currentValue: AccountPayableList) =>
          previousValue + Number(currentValue?.balance),
        0
      ),
    [data]
  );

  const customCell = [
    {
      columnIndex: 0,
      render: (row: AccountPayableList, rowIndex: number) => (
        <Radio
          checked={row.id === accountId}
          onChange={() => setAccount(row.id)}
          value="a"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}
          sx={{
            p: 0,
          }}
        />
      ),
    },
  ];

  const accountSelected = data.find((account: AccountPayableList) => account.id === accountId) ?? null;

  return (
    <>
      <Paper sx={{ width: 1, display: 'flex', justifyContent: 'flex-start', p: 1 }}>
        <PaymentDialogForm
          account={{ id: accountSelected?.id ?? null, label: accountSelected?.code ?? '' }}
          balance={accountSelected?.balance ?? 1}
        />
      </Paper>
      <Paper sx={{ px: 0 }}>
        <Toolbar
          sx={{
            textAlign: 'center',
            ...toolbarSx,
          }}
          variant="dense"
        >
          <Typography sx={{ flex: '1 1 100%' }} variant="subtitle1" id="tableTitle" component="div">
            Listado de Cuentas por Pagar
          </Typography>
        </Toolbar>
        <MuiDatatable
          data={data}
          columns={ACCOUNT_PAYABLE_COLUMNS}
          loading={isFetching}
          customCell={customCell}
          options={{
            search: false,
            checkbox: false,
            pagination: false,
            dense: false,
            toolbar: false,
          }}
          sx={{
            tableHead: { bgcolor: 'background.paper' },
          }}
          onSelectedRow={(row: AccountPayableList) => setAccount(row?.id)}
        />
        <Paper sx={{ display: 'flex', justifyContent: 'flex-end', width: 1, p: 2 }}>
          <Typography
            display="flex"
            variant="subtitle2"
            fontSize={16}
            color="text.secondary"
            component="div"
          >
            Total: {totalDebt?.toFixed(2)}
          </Typography>
        </Paper>
      </Paper>
      <PaymentsTable
        accountId={accountId}
        toolbarSx={{ bgcolor: 'background.neutral', color: 'text.secondary', minHeight: 36 }}
      />
    </>
  );
}

export default AccountsPayableTable;
