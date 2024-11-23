//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { useQueryClient } from '@tanstack/react-query';

import { UserList } from '../../../../types/security/user';
import { ChangeStates } from '../../../../types';

import { bulkDelete, changeStates } from '../../../../api/get-data';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { useGetData } from '../../../../hooks/use-get-data';

import { headLabel } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function UserTable() {

  const { data=[], isLoading } = useGetData({
    url: '/api/users/user/',
    queryKey: ['users'],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/users/user/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        selectAll(false);
      },
    });
  };

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/users/user/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0)
          queryClient.invalidateQueries({ queryKey: ['users'] });
        selectAll(false);
      },
    });
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const rowSelectedOptions = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar a los usuarios seleccionados?`,
      },
      fn: (selected: Array<number>, selectAll: (value: boolean) => void) =>
        handleBulkDelete(selected, selectAll),
    },
    {
      tooltip: 'Inactivar',
      icon: 'material-symbols:no-sim',
      alertOptions: {
        content: `¿Esta seguro de inactivar a los usuarios seleccionados?`,
      },
      fn: (selected: Array<number>, selectAll: (value: boolean) => void) =>
        handleChangeStates({ action: 'disable', selected: selected, selectAll: selectAll }),
    },
    {
      tooltip: 'Activar',
      icon: 'solar:check-read-bold',
      alertOptions: {
        content: `¿Esta seguro de activar a los usuarios seleccionados?`,
      },
      fn: (selected: Array<number>, selectAll: (value: boolean) => void) =>
        handleChangeStates({ action: 'enable', selected: selected, selectAll: selectAll }),
    },
  ];

  const customCell = [
    {
      columnIndex: 0,
      render: (data: UserList, rowIndex: number) => {
        return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={data.username} src={BASE_URL+data?.image} />
          <ListItemText>
            <Typography variant="subtitle2">{data.username}</Typography>
            <Typography variant="body2" color="text.disabled">
              {data?.email}
            </Typography>
          </ListItemText>
        </Stack>
      )},
    },
    {
      columnIndex: 3,
      render: (data: UserList, rowIndex: number) =>
          <Label color="info">{data.role}</Label>
    },
    {
      columnIndex: 4,
      render: (data: UserList, rowIndex: number) =>
        data.is_active ? (
          <Label color="info">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 5,
      render: (data: UserList, rowIndex: number) => (
        <PopupOptions id={data.id} user={`${data?.cedula} / ${data?.username}`} />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['username', 'cedula', 'email', 'laboratory', 'role']}}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
    </>
  );
}
