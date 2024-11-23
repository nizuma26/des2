import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

import { useGetData } from '../../../../hooks/use-get-data';

import { useAlert } from '../../../../components/alert';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { ACCOUNT_PAYABLE_COLUMNS, PAYMENT_COLUMNS, QUERY_KEYS } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import { SvgIcon } from '../../../../components/svg-color';
import { Payment } from '../../../../types/common/payment';
import { deleteData } from '../../../../api/get-data';

interface PaymentsTableProps {
  accountId: number | null;
  toolbarSx?: SxProps;
}

function PaymentsTable({ accountId, toolbarSx }: PaymentsTableProps) {
  const { data = [], isFetching } = useGetData({
    url: `api/procurement/account-payable-payments/?account_id=${accountId}`,
    queryKey: [QUERY_KEYS.PAYMENT, accountId],
    enabled: !!accountId,
  });

  const { showAlert } = useAlert();

  const mutate = useMutateData();

  const handleDelete = (id: number | null) => {
    showAlert({
      content: `¿Esta seguro de eliminar el pago?`,
      fn: () =>
        mutate.submit({
          promise: deleteData(`api/procurement/account-payable-payments/${id}/`),
          onSuccess: () => {
            mutate.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT, id] });
            mutate.invalidateQueries({ queryKey: [QUERY_KEYS.ACCOUNT_PAYABLE] });
            mutate.invalidateQueries({ queryKey: [QUERY_KEYS.DEBT_SUPPLIERS] });
      },
        }),
    });
  };

  const customCell = [
    {
      columnIndex: 0,
      render: (payment: Payment) => (
        <IconButton color="error" onClick={() => handleDelete(payment?.id ?? null)}>
          <SvgIcon icon="ic_trash" />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ px: 0 }}>
      <Toolbar
        sx={{
          textAlign: 'center',
          ...toolbarSx,
        }}
        variant="dense"
      >
        <Typography sx={{ flex: '1 1 100%' }} variant="subtitle1" id="tableTitle" component="div">
          Listado de Pagos
        </Typography>
      </Toolbar>
      <MuiDatatable
        data={data}
        columns={PAYMENT_COLUMNS}
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
      />
    </Paper>
  );
}

export default PaymentsTable;
