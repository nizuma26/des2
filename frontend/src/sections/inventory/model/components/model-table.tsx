import { useQuery, useQueryClient } from '@tanstack/react-query';

import { bulkDelete, getData } from '../../../../api/get-data';

import { TABLE_COLUMNS, QUERY_KEYS } from '../context';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { RowSelectedOptions } from '../../../../components/datatable/types';
import { ModelList } from '../../../../types/inventory/model';

import { onlyNumbers } from '../../../../utils/type-guard';

import { MuiDatatable } from '../../../../components/datatable';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function ModelTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['models'],
    queryFn: () => getData('/api/inventory/model/'),
    staleTime: 15 * 1000,
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/inventory/model/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] })
        selectAll(false)
      },
    })
  };

  const customCell = [
    {
      columnIndex: 2,
      render: (data: ModelList) => (
        <PopupOptions data={data} />
      ),
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Mover a papelera',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        disable: true,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleBulkDelete(arrayNumbers, selectAll);
      },
    },    
  ];

  return (
      <MuiDatatable
        data={data}
        columns={TABLE_COLUMNS}
        loading={isLoading}
        options={{ filterFields: ['name', 'brand_name']}}
        rowsSelectedOptions={rowSelectedOptions}
        customCell={customCell}
      />
  );
}
