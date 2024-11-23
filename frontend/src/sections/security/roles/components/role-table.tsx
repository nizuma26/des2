import { useQueryClient } from '@tanstack/react-query';

import { bulkDelete } from '../../../../api/get-data';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { Role } from '../../../../types/security/role';

import { headLabel } from '../context';

import { MuiDatatable } from '../../../../components/datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';
import { useGetData } from '../../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function RoleTable() {

  const { data=[], isLoading } = useGetData({
    url: '/api/users/role/',
    queryKey: ['roles'],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/users/role/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] });
        selectAll(false);
      },
    });
  };

  const rowSelectedOptions = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar los roles seleccionados?`,
      },
      fn: (selected: Array<number>, selectAll: (value: boolean) => void) =>
        handleBulkDelete(selected, selectAll),
    }
  ];

  const customCell = [
    {
      columnIndex: 1,
      render: (data: Role, rowIndex: number) =>
          <Label color="info">{data.permissions}</Label>
    },
    {
      columnIndex: 2,
      render: (data: Role, rowIndex: number) =>
          <PopupOptions id={Number(data.id)} name={data.name} />
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['name', 'permissions']}}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
    </>
  );
}
