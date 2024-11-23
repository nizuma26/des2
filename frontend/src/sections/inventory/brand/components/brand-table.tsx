import { useQuery, useQueryClient } from '@tanstack/react-query';

import { bulkDelete, getData } from '../../../../api/get-data';

import { TABLE_COLUMNS, QUERY_KEYS } from '../context';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import {  GenericValues } from '../../../../types';

import { MuiDatatable } from '../../../../components/datatable';
import Label from '../../../../components/label';
import PopupOptions from './popup-options';
import { RowSelectedOptions } from '../../../../components/datatable/types';
import { onlyNumbers } from '../../../../utils/type-guard';

// ----------------------------------------------------------------------

export default function BrandTable() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.list],
    queryFn: () => getData('/api/inventory/brand/'),
    staleTime: 15 * 1000,
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/inventory/brand/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
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
      tooltip: 'Mover a papelera',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        disable: true,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleBulkDelete(arrayNumbers, selectAll)
      }
    }
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
