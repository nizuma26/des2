//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import { Inventory } from '../../../../../types/reports/inventory';

import { useGetData } from '../../../../../hooks/use-get-data';

import { TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PrintInventoryPDF from '../document-pdf/print-invoice';

// ----------------------------------------------------------------------

export default function InventoryTable() {

  const { data = [], isPending } = useGetData({
    url: `api/reports/stocks/`,
    queryKey: ['stocks'],
    staleTime: 0
  });

  const customCell = [
    {
      columnIndex: 4,
      render: (data: Inventory, rowIndex: number) => (
        <Label color='primary'>{data.available}</Label>
      ),
    },
    {
      columnIndex: 5,
      render: (data: Inventory, rowIndex: number) => {
        const color = data.min_stock > data.stock ? 'success' : 'error'
        return <Label color={color}>{data.min_stock}</Label>
    },
    },
    {
      columnIndex: 6,
      render: (data: Inventory, rowIndex: number) => {
        const color = data.max_stock < data.stock ? 'error' : 'primary'
        return <Label color={color}>{data.max_stock}</Label>
    },
    },
  ];

  const summary = (
    <Stack
      direction="column"
      gap={2}
      alignItems="flex-end"
      textAlign="right"
      p={3}
      overflow="hidden"
    >
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box maxWidth={1} alignItems="flex-start">
          Total de existencias
        </Box>
        <Box width={160}>{data?.total_stock}</Box>
      </Stack>
      <Stack direction="row" typography="subtitle2" gap={1}>
        <Box>Total de precios {'(VED)'} </Box>
        <Box width={160} maxWidth={1} color="secondary.main">
          {data?.total_price?.toFixed(2)}
        </Box>
      </Stack>
    </Stack>
  );

  const toolbarComponents = (
    <>
      <PrintInventoryPDF inventory={data?.stocks ?? []} laboratory={data?.laboratory} />
    </>
  );

  return (
    <Card>
      <MuiDatatable
        data={data?.stocks}
        columns={TABLE_COLUMNS}
        loading={isPending}
        options={{
          checkbox: false,
          filterFields: ['name', 'category', 'brand', 'model'],
          pagination: false,
          dense: false,
        }}
        customCell={customCell}
        toolbarComponents={toolbarComponents}
        sx={{ inputStyle: { width: '100%' } }}
      />
      {summary}
    </Card>
  );
}
