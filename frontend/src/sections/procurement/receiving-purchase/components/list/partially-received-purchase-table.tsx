//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetData } from '../../../../../hooks/use-get-data';
import { CustomCell } from '../../../../../components/datatable/types';

import { ReceivingPurchaseList } from '../../../../../types/procurements/receiving-order';
import { QUERY_KEYS, PARTIALLY_RECEIVED_TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import { useRouter } from '../../../../../routes/hooks';

// ----------------------------------------------------------------------

export default function PartiallyReceivedPurchaseTable() {
  const { data = [], isFetching } = useGetData({
    url: 'api/procurement/receiving-purchase/?status=Parcialmente Recibido',
    queryKey: [QUERY_KEYS.PARTIALLY_RECEIVED],
  });

  const router = useRouter();

  const customCell:CustomCell<ReceivingPurchaseList>[]
   = [
    {
      columnIndex: 0,
      render: (data) => (
        <Typography variant="body2" color="text.secondary">
          #{data?.code}
        </Typography>
      ),
    },
    {
      columnIndex: 2,
      render: (data) => (
        <Stack direction="column" spacing={1}>
          {data?.reception_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data?.reception_hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 3,
      render: (data) => (
        <>{data?.confirmed_date ?? 'Sin confirmar'}</>
      ),
    }
  ];

  return (
    <MuiDatatable
      data={data}
      columns={PARTIALLY_RECEIVED_TABLE_COLUMNS}
      loading={isFetching}
      options={{
        checkbox: false,
        filterFields: ['code', 'supplier', 'order_date'],
      }}
      customCell={customCell}
      sx={{ inputStyle: { width: '100%' } }}
      onSelectedRow={(reception: ReceivingPurchaseList) => router.push(`continue/${reception.id}`)}
    />
  );
}
