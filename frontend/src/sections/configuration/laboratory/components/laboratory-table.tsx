//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { useQueryClient } from '@tanstack/react-query';

import { changeStates } from '../../../../api/get-data';

import { headLabel } from '../context';

import { ChangeStates } from '../../../../types';
import { RowSelectedOptions } from '../../../../components/datatable/types';
import { LaboratoryList } from '../../../../types/configuration/laboratory';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useGetData } from '../../../../hooks/use-get-data';
import { onlyNumbers } from '../../../../utils/type-guard';

import { MuiDatatable } from '../../../../components/datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function LaboratoryTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/config/laboratory/',
    queryKey: ['labs'],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/config/laboratory/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0)
          queryClient.invalidateQueries({ queryKey: ['labs'] });
        selectAll(false);
      },
    });
  };

  const rowSelectedOptions: RowSelectedOptions[] = [
    {
      tooltip: 'Inactivar',
      icon: 'material-symbols:no-sim',
      alertOptions: {
        content: `¿Esta seguro de inactivar los laboratorios seleccionados?`,
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
        content: `¿Esta seguro de activar los laboratorios seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'enable', selected: arrayNumbers, selectAll: selectAll });
      },
    },
  ];

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const customCell = [
    {
      columnIndex: 0,
      render: (data: LaboratoryList) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={data.name} src={BASE_URL + data?.get_logo} />
          <ListItemText>
            <Typography variant="subtitle2">{data.name}</Typography>
            <Typography variant="caption" color="text.secondary" mr="3px">
              {data?.code}{' '}
            </Typography>
            {data.is_main && <Label color="info">Principal</Label>}
          </ListItemText>
        </Stack>
      ),
    },
    {
      columnIndex: 3,
      render: (data: LaboratoryList) =>
        data.is_active ? (
          <Label color="info">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 4,
      render: (data: LaboratoryList) => (
        <PopupOptions id={data.id} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['code', 'name', 'document', 'email'] }}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
    </>
  );
}
