//@mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetData } from '../../../../../hooks/use-get-data';

import { PurchaseOrderList } from '../../../../../types/procurements/purchase-orders';
import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function PurchaseOrderTable() {

  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/purchase-order/',
    queryKey: [QUERY_KEYS.list],
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseOrderList) => (
        <Typography variant="body2" color='text.secondary'>#{data.code}</Typography>
      ),
    },
    {
      columnIndex: 2,
      render: (data: PurchaseOrderList) => (
        <Stack direction="column" spacing={1}>
          {data.order_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.order_hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 5,
      render: (data: PurchaseOrderList) => {
        if (data.status === 'Cerrada') return <Label color="success">{data.status}</Label>;
        else if (data.status === 'Pendiente') return <Label color="warning">{data.status}</Label>;
        else if (data.status === 'Borrador') return <Label color="default">{data.status}</Label>;
        else if (data.status === 'Completamente Recibido') return <Label color="blue">{data.status}</Label>;
        else if (data.status === 'Parcialmente Recibido') return <Label color="cyan">{data.status}</Label>;
        return <Label color="error">{data.status}</Label>;
      },
    },
    {
      columnIndex: 6,
      render: (data: PurchaseOrderList) => (
        <PopupOptions id={data.id} status={data.status} code={data.code} />
      ),
    },
  ];

  return (
      <Card>
        <MuiDatatable
          data={data}
          columns={TABLE_COLUMNS}
          loading={isLoading}
          options={{
            checkbox: false,
            filterFields: ['code', 'supplier', 'status', 'order_date'],
          }}
          customCell={customCell}
        />
      </Card>
  );
}
