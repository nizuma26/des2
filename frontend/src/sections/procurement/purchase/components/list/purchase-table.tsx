//@mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useGetData } from '../../../../../hooks/use-get-data';

import { PurchaseList } from '../../../../../types/procurements/purchase';
import { headLabel } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PopupOptions from './popup-options';
import DateRange from '../../../../common/date-ranger-picker';

// ----------------------------------------------------------------------

export default function PurchaseTable() {
  const { data = [], isLoading } = useGetData({
    url: 'api/procurement/purchase/',
    queryKey: ['purchases'],
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseList, rowIndex: number) => (
        <Typography variant="body2" color='text.secondary'>#{data.code}</Typography>
      ),
    },
    {
      columnIndex: 3,
      render: (data: PurchaseList, rowIndex: number) => (
        <Typography variant="body2">
          {!data?.payment_method ? 'Sin definir' : data?.payment_method}
        </Typography>
      ),
    },
    {
      columnIndex: 4,
      render: (data: PurchaseList, rowIndex: number) => (
        <Stack direction="column">
          {data.last_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 7,
      render: (data: PurchaseList, rowIndex: number) => {
        if (data.status === 'Borrador') return <Label color="default">{data.status}</Label>;
        else if (data.status === 'Por pagar') return <Label color="warning">{data.status}</Label>;
        else if (data.status === 'Anulada') return <Label color="error">{data.status}</Label>;
        return <Label color="success">{data.status}</Label>;
      },
    },
    {
      columnIndex: 8,
      render: (data: PurchaseList, rowIndex: number) => (
        <PopupOptions id={data.id} status={data.status} code={data.code} />
      ),
    },
  ];

  return (
      <Card>
        <MuiDatatable
          data={data}
          columns={headLabel}
          loading={isLoading}
          options={{
            filterFields: ['code', 'laboratory', 'supplier', 'payment_method', 'total_bs', 'total_usd'],
          }}
          customCell={customCell}
          toolbarComponents={<DateRange />}
          sx={{ inputStyle: { width: '100%' } }}
        />
      </Card>
  );
}
