import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { PaymentTableProps } from './types';
import { PatientPayment } from '../../../../types/orders/payments';

import { useGetData } from '../../../../hooks/use-get-data';

import { PAYMENTS_TABLE_COLUMNS, QUERY_KEYS } from './context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import { DeleteIcon } from '../../../../components/iconify/default-icons';
import CustomTooltip from '../../../../components/custom-tooltip';

// -------------------------------------------------------

export default function PaymentTable({ orderId, hasDebt }:PaymentTableProps) {
  const { data = [], isLoading } = useGetData({
    url: `/api/orders/payment/?order_id=${orderId}`,
    queryKey: [QUERY_KEYS.payments, orderId],
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PatientPayment, rowIndex: number) => {
        return hasDebt 
        ? (
          <CustomTooltip title="Eliminar pago" placement='right-end'>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </CustomTooltip>
        ) : (<>{rowIndex +1}</>)
      },
    },
    {
      columnIndex: 3,
      render: (data: PatientPayment, rowIndex: number) => {
        return (
          <Box display="flex" gap={1}>
            <Typography variant="caption">{data.payment_date}</Typography>
            <Typography variant="caption" color="text.secondary">
              {data.payment_time}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <MuiDatatable
      data={data}
      columns={PAYMENTS_TABLE_COLUMNS}
      loading={isLoading}
      customCell={customCell}
      options={{ checkbox: false, dense: false, search: false, toolbar: false }}
      sx={{ table: { size: 'small' } }}
    />
  );
}
