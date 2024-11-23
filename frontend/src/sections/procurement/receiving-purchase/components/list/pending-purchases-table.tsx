//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CustomCell } from '../../../../../components/datatable/types';

import { useGetData } from '../../../../../hooks/use-get-data';

import { PurchaseOrderList } from '../../../../../types/procurements/purchase-orders';
import { QUERY_KEYS, PENDING_RECEPTION_TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import { useRouter } from '../../../../../routes/hooks';

// ----------------------------------------------------------------------

export default function PendingPurchasesTable() {
  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/purchase-order/?status=Pendiente',
    queryKey: [QUERY_KEYS.PENDING],
  });

  const router = useRouter();

  const customCell:CustomCell<PurchaseOrderList>[] = [
    {
      columnIndex: 0,
      render: (data) => (
        <Typography variant="body2" color="text.secondary">
          #{data.code}
        </Typography>
      ),
    },
    {
      columnIndex: 2,
      render: (data) => (
        <Stack direction="column" spacing={1}>
          {data.order_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.order_hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 3,
      render: (data) => (
        <>{data?.confirmed_date ?? 'Sin confirmar'}</>
      ),
    },
    {
      columnIndex: 5,
      render: (data) => {
        if (data.status === 'Borrador') return <Label color="secondary">{data.status}</Label>;
        else if (data.status === 'Pendiente') return <Label color="warning">{data.status}</Label>;
        else if (data.status === 'Anulado') return <Label color="default">{data.status}</Label>;
        return <Label color="success">{data.status}</Label>;
      },
    },
  ];

  return (
    <MuiDatatable
      data={data}
      columns={PENDING_RECEPTION_TABLE_COLUMNS}
      loading={isLoading}
      options={{
        checkbox: false,
        filterFields: ['code', 'supplier', 'status', 'order_date'],
      }}
      customCell={customCell}
      sx={{ inputStyle: { width: '100%' } }}
      onSelectedRow={(order: PurchaseOrderList) => router.push(`add/${order.id}`)}
    />
  );
}
