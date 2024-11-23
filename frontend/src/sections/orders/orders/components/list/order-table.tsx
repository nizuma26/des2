import { OrderList } from '../../../../../types/orders/orders';

import { TABLE_COLUMNS, QUERY_KEYS } from '../../context';

import { useGetData } from '../../../../../hooks/use-get-data';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// ----------------------------------------------------------------------

export default function OrderTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/orders/order/',
    queryKey: [QUERY_KEYS.list],
  });

  console.log(data)

  const customCell = [
    {
      columnIndex: 0,
      render: (order: OrderList) => (
        <Typography variant='subtitle2' color="text.secondary">{order.code}</Typography>
      )
    },
    {
      columnIndex: 1,
      render: (order: OrderList) => {
        const patientName = order.patient_names.slice(0, 1) + order.patient_last_names.slice(0, 1);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'primary.main'}}>
              {patientName}
            </Avatar>
            <ListItemText>
              <Typography variant="subtitle2" fontSize={13}>
                {order.patient_names} {order.patient_last_names}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {order.patient_cedula}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 2,
      render: (order: OrderList) => (
        <Stack direction="column" spacing={1}>
          {order?.order_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {order?.hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 4,
      render: (order: OrderList) => {
        if (order?.status === 'Procesado') return <Label color='success'>{order?.status}</Label>
        else if (order?.status === 'Pendiente') return <Label color='warning'>{order?.status}</Label>
        else if (order?.status === 'Parcialmente procesado') return <Label color='blue'>{order?.status}</Label>
      },
    },
    {
      columnIndex: 5,
      render: (order: OrderList) => (
        <PopupOptions id={order?.id} code={order?.code} status={order?.status} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        options={{
          checkbox: false,
          filterFields: ['patient_names', 'patient_last_names', 'patient_cedula', 'code', 'status'],
        }}
        loading={isLoading}
        customCell={customCell}
      />
    </>
  );
}
