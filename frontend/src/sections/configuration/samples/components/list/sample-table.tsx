import { useQueryClient } from '@tanstack/react-query';

import { RowSelectedOptions } from '../../../../../components/datatable/types';
import { Sample } from '../../../../../types/configuration/samples';


import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { moveToTrash } from '../../../../../api/get-data';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { MuiDatatable } from '../../../../../components/datatable';
import { useGetData } from '../../../../../hooks/use-get-data';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';

// ----------------------------------------------------------------------

export default function SampleTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/config/sample/?status=true',
    queryKey: [QUERY_KEYS.enabled],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/sample', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.enabled] });
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
      render: (data: Sample) =>
        data.is_active ? (
          <Label color="success">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 2,
      render: (data: Sample) => <PopupOptions data={data} />,
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
