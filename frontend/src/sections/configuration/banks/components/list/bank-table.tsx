import { useQueryClient } from '@tanstack/react-query';

import { Bank } from '../../../../../types/configuration/banks';

import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { moveToTrash } from '../../../../../api/get-data';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import { useGetData } from '../../../../../hooks/use-get-data';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';
import { CustomCell } from '../../../../../components/datatable/types';

// ----------------------------------------------------------------------

export default function BankTable() {

  const { data = [], isLoading } = useGetData({
    url: '/api/config/bank/',
    queryKey: [QUERY_KEYS.list],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/bank', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
        selectAll(false);
      },
    });
  };

  const rowSelectedOptions = [
    {
      tooltip: 'Mover a la papelera',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de mover a la papelera los registros seleccionados?`,
      },
      fn: (selected: Array<number | string>, selectAll: (value: boolean) => void) =>{
        const arrayNumbers = onlyNumbers(selected)
        handleMoveToTrash(arrayNumbers, selectAll)
      }
    },
  ];

  const customCell:CustomCell<Bank>[] = [
    {
      columnIndex: 1,
      render: () =>
        data.is_active ? (
          <Label color="success">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 2,
      render: (BankData) => <PopupOptions data={BankData} />,
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
