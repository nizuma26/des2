import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { OrderDetailTableCardProps } from './types';
import { Columns } from '../../../../../types/ui';
import { OrderDetail } from '../../../../../types/orders/orders';

import { MuiDatatable } from '../../../../../components/datatable';

// ----------------------------------------------------------------------

export default function OrderDetailTable({
  labTests,
  mainCurrencyCode,
  secondaryCurrencyCode,
}: OrderDetailTableCardProps) {
  
  const DETAIL_TABLE_COLUMNS: Array<Columns> = [
    { id: 'name', label: 'Examen', sort: false },
    { id: 'discount', label: 'Descuento', sort: false, align: 'center' },
    {
      id: 'price',
      label: `Precio (${mainCurrencyCode})`,
      sort: false,
      align: 'center',
    },
    {
      id: 'secondary_price',
      label: `Precio en divisa (${secondaryCurrencyCode})`,
      sort: false,
      align: 'center',
    },
  ];

  const customCell = [
    {
      columnIndex: 0,
      render: (data: OrderDetail) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <ListItemText>
            <Typography variant="subtitle2" fontSize={13}>
              {data.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {data.abbreviation}
            </Typography>
          </ListItemText>
        </Stack>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader title="Examenes solicitados" />
      <CardContent sx={{ p: 0 }}>
        <MuiDatatable
          data={labTests}
          columns={DETAIL_TABLE_COLUMNS}
          options={{
            checkbox: false,
            search: true,
            dense: false,
            filterFields: ['abbreviation', 'name'],
            selectField: 'uuid',
            key: 'uuid'
          }}
          customCell={customCell}
          sx={{ table: { size: 'small', scrollY: 350, scrollX: 200 }, inputStyle: { width: '100%' } }}
        />
      </CardContent>
    </Card>
  );
}
