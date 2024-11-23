//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { useQueryClient } from '@tanstack/react-query';

import { RowSelectedOptions } from '../../../../components/datatable/types';

import { onlyNumbers } from '../../../../utils/type-guard';
import { bulkDelete, changeStates } from '../../../../api/get-data';

import { useGetData } from '../../../../hooks/use-get-data';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { ItemList } from '../../../../types/inventory/item';
import { ChangeStates } from '../../../../types';

import { headLabel } from '../context';

import { MuiDatatable } from '../../../../components/datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function ItemTable() {
  const { data = [], isLoading } = useGetData({
    url: 'api/inventory/item/',
    queryKey: ['items'],
    staleTime: 0,
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/inventory/item/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['items'] });
        selectAll(false);
      },
    });
  };

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/inventory/item/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0)
          queryClient.invalidateQueries({ queryKey: ['items'] });
        selectAll(false);
      },
    });
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar los artículos seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleBulkDelete(arrayNumbers, selectAll);
      },
    },
    {
      tooltip: 'Inactivar',
      icon: 'material-symbols:no-sim',
      alertOptions: {
        content: `¿Esta seguro de inactivar los artículos seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'disable', selected: arrayNumbers, selectAll: selectAll });
      },
    },
    {
      tooltip: 'Activar',
      icon: 'solar:check-read-bold',
      alertOptions: {
        content: `¿Esta seguro de activar los artículos seleccionados sss?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'enable', selected: arrayNumbers, selectAll: selectAll });
      },
    },
  ];

  const customCell = [
    {
      columnIndex: 0,
      render: (data: ItemList) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              variant="rounded"
              alt={data.name}
              src={BASE_URL + data?.image}
              sx={{ bgcolor: 'primary.main' }}
            />
            <ListItemText>
              <Typography variant="subtitle2">{data.name}</Typography>
              <Typography variant="body2" color="text.disabled">
                {data?.code}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 5,
      render: (data: ItemList) =>
        data.is_active ? (
          <Label color="info">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 6,
      render: (data: ItemList) => (
        <PopupOptions id={data.id} item={`${data?.code} / ${data?.name}`} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['name', 'item_type', 'category', 'brand', 'model'] }}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
    </>
  );
}
