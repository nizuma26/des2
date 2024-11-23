import { Container } from '../../../../../types/configuration/containers';

import { useQueryClient } from '@tanstack/react-query';

import { CustomCell, RowSelectedOptions } from '../../../../../components/datatable/types';
import { onlyNumbers } from '../../../../../utils/type-guard';

import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { moveToTrash } from '../../../../../api/get-data';
import { useGetData } from '../../../../../hooks/use-get-data';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function ContainerTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/config/container/?status=true',
    queryKey: [QUERY_KEYS.enabled],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/container', selected),
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

  const customCell: CustomCell<Container>[] = [
    {
      columnIndex: 1,
      render: (data) => <PopupOptions data={data} />,
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
