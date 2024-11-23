import { useQuery, useQueryClient } from '@tanstack/react-query';

import { RowSelectedOptions } from '../../../../components/datatable/types';
import { GenericValues } from '../../../../types';

import { getData } from '../../../../api/get-data';

import { onlyNumbers } from '../../../../utils/type-guard';
import { bulkDelete, changeStates } from '../../../../api/get-data';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { TABLE_COLUMNS, QUERY_KEYS } from '../context';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import PopupOptions from './options';
import Label from '../../../../components/label';

// ----------------------------------------------------------------------

interface ChangeStates {
  action: string;
  selected: Array<number>;
  selectAll: (value: boolean) => void;
}

export default function CategoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.list],
    queryFn: () => getData('/api/inventory/category/'),
    staleTime: 15 * 1000,
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/inventory/category/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        selectAll(false);
      },
    });
  };

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/inventory/category/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        }
        selectAll(false);
      },
    });
  };

  const customCell = [
    {
      columnIndex: 1,
      render: (data: GenericValues) =>
        data.is_active ? (
          <Label color="success">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 2,
      render: (data: GenericValues) => <PopupOptions data={data} />,
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar las categorías seleccionadas?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleBulkDelete(arrayNumbers, selectAll)
      }
    },
    {
      tooltip: 'Inactivar',
      icon: 'material-symbols:no-sim',
      alertOptions: {
        content: `¿Esta seguro de inactivar las categorías seleccionadas?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'disable', selected: arrayNumbers, selectAll: selectAll })
      },
    },
    {
      tooltip: 'Activar',
      icon: 'solar:check-read-bold',
      alertOptions: {
        content: `¿Esta seguro de activar las categorías seleccionadas?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'enable', selected: arrayNumbers, selectAll: selectAll })
      },
    },
  ];

  return (
    <>
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{ filterFields: ['name', 'is_active'] }}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
    </>
  );
}
