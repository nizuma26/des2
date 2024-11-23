//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import { CustomCell } from '../../../../components/datatable/types';
import { BeginningInventoryList } from '../../../../types/beginning-inventory';

import { getData } from '../../../../api/get-data';

import { headLabel } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function BeginningInventoryTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['beginning-inventory'],
    queryFn: () => getData('api/inventory/beginning-inventory/'),
    staleTime: 15 * 1000,
  });

  const customCell: CustomCell<BeginningInventoryList>[] = [
    {
      columnIndex: 3,
      render: (data) => (
        <Stack direction="column">
          {data.last_date}
          <Typography variant="caption" color="text.secondary" mt="3px">
            {data.hour}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 5,
      render: (data) => {
        if (data.status === 'En proceso') return <Label color="warning">{data.status}</Label>;
        else if (data.status === 'Finalizado') return <Label color="success">{data.status}</Label>;
        return <Label color="default">Anulado</Label>;
      },
    },
    {
      columnIndex: 6,
      render: (data) => <PopupOptions id={data.id} status={data.status} code={data.code} />,
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['laboratory', 'user', 'last_date', 'total'], checkbox: false }}
        customCell={customCell}
      />
    </>
  );
}
