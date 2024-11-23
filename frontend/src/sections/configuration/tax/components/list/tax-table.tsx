import { useQueryClient } from '@tanstack/react-query';

import { Tax } from '../../../../../types/configuration/tax';
import { RowSelectedOptions } from '../../../../../components/datatable/types';


import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { moveToTrash } from '../../../../../api/get-data';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import { useGetData } from '../../../../../hooks/use-get-data';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function TaxesTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/config/tax/',
    queryKey: [QUERY_KEYS.list],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/tax', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        selectAll(false);
      },
    });
  };

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Mover a la papelera',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de mover a la papelera los registros seleccionados?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        handleMoveToTrash(arrayNumbers, selectAll);
      },
    },
  ];

  const customCell = [
    {
      columnIndex: 1,
      render: (taxData: Tax) => <>{taxData.tax}%</>,
    },
    {
      columnIndex: 3,
      render: (taxData: Tax) => <PopupOptions data={taxData} />,
    },
  ];

  return (
    <MuiDatatable
      data={data}
      columns={TABLE_COLUMNS}
      loading={isLoading}
      customCell={customCell}
      rowsSelectedOptions={rowSelectedOptions}
    />
  );
}
