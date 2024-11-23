//@mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetData } from '../../../../../hooks/use-get-data';

import { PurchaseRequisitionList } from '../../../../../types/procurements/purchase-requisition';
import { REQUISITION_TABLE_COLUMNS, QUERY_KEY } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import DateRange from '../../../../common/date-ranger-picker';
import { useRouter } from '../../../../../routes/hooks';

// ----------------------------------------------------------------------

export default function PendingRequisitionTable() {

  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/purchase-requisition/?state=pendiente',
    queryKey: [QUERY_KEY.requisition],
  });

  const router = useRouter();

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseRequisitionList, rowIndex: number) => (
        <Typography variant="body2" color='text.secondary'>#{data.code}</Typography>
      ),
    },
    {
      columnIndex: 3,
      render: (data: PurchaseRequisitionList, rowIndex: number) => (
        <Stack direction="column" spacing={1}>
          {data.request_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.request_hour}
          </Typography>
        </Stack>
      ),
    },
  ];

  return (
      <Card>
        <MuiDatatable
          data={data}
          columns={REQUISITION_TABLE_COLUMNS}
          loading={isLoading}
          options={{
            checkbox: false,
            filterFields: ['code', 'laboratory', 'requester', 'request_date'],
          }}
          customCell={customCell}
          toolbarComponents={<DateRange />}
          sx={{ inputStyle: { width: '100%' } }}
          onSelectedRow={(data) => router.replace(`/approval-requisitions/approval/${data.id}`)}
        />
      </Card>
  );
}
