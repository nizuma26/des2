//@mui
import { useQueryClient } from '@tanstack/react-query';

import { headLabel } from '../context';

import { bulkDelete, changeStates } from '../../../../api/get-data';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useGetData } from '../../../../hooks/use-get-data';

import { SupplierList } from '../../../../types/procurements/supplier';
import { RowSelectedOptions } from '../../../../components/datatable/types';

import { MuiDatatable } from '../../../../components/datatable';
import PopupOptions from './popup-options';
import Label from '../../../../components/label';
import { onlyNumbers } from '../../../../utils/type-guard';

// ----------------------------------------------------------------------

interface ChangeStates {
  action: string;
  selected: Array<number>;
  selectAll: (value: boolean) => void;
}

export default function SupplierTable() {
  const { data, isLoading } = useGetData({
    url: 'api/procurement/supplier/',
    queryKey: ['suppliers'],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/procurement/supplier/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        selectAll(false);
      },
    });
  };

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/procurement/supplier/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0)
          queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        selectAll(false);
      },
    });
  };

  const customCell = [
    {
      columnIndex: 4,
      render: (data: SupplierList) => {
        return data.is_active ? (
          <Label color="info">Activo</Label>
        ) : (
          <Label color="error">Inactivo</Label>
        );
      },
    },
    {
      columnIndex: 5,
      render: (data: SupplierList) => <PopupOptions id={Number(data?.id)} name={data.trade_name} />,
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar los proveedores seleccionados?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleBulkDelete(arrayNumbers, selectAll);
      }
    },
    {
      tooltip: 'Inactivar',
      icon: 'material-symbols:no-sim',
      alertOptions: {
        content: `¿Esta seguro de inactivar los proveedores seleccionados?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'disable', selected: arrayNumbers, selectAll: selectAll })
      }
    },
    {
      tooltip: 'Activar',
      icon: 'solar:check-read-bold',
      alertOptions: {
        content: `¿Esta seguro de activar los proveedores seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'enable', selected: arrayNumbers, selectAll: selectAll })
      }
    },
  ];

  return (
    <MuiDatatable
      data={data}
      columns={headLabel}
      loading={isLoading}
      options={{ filterFields: ['trade_name', 'rif', 'email', 'phone_number'] }}
      rowsSelectedOptions={rowSelectedOptions}
      customCell={customCell}
    />
  );
}
