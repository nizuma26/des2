//@mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetData } from '../../../../../hooks/use-get-data';

import { PurchaseRequisitionList } from '../../../../../types/procurements/purchase-requisition';
import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function PurchaseRequisitionTable() {

  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/purchase-requisition/',
    queryKey: [QUERY_KEYS.list],
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseRequisitionList) => (
        <Typography variant="body2" color='text.secondary'>#{data.code}</Typography>
      ),
    },
    {
      columnIndex: 3,
      render: (data: PurchaseRequisitionList) => (
        <Stack direction="column" spacing={1}>
          {data.request_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.request_hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 5,
      render: (data: PurchaseRequisitionList) => {
        if (data.status === 'Borrador') return <Label color="default">{data.status}</Label>;
        else if (data.status === 'Pendiente') return <Label color="warning">{data.status}</Label>;
        else if (data.status === 'Anulado') return <Label color="blue">{data.status}</Label>;
        else if (data.status === 'Rechazado') return <Label color="error">{data.status}</Label>;
        else if (data.status === 'Devuelto') return <Label color="cyan">{data.status}</Label>;
        return <Label color="success">{data.status}</Label>;
      },
    },
    {
      columnIndex: 6,
      render: (data: PurchaseRequisitionList) => (
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
            filterFields: ['code', 'laboratory', 'requester', 'request_date', 'status'],
          }}
          customCell={customCell}
          sx={{ inputStyle: { width: '100%' } }}
        />
      </Card>
  );
}
