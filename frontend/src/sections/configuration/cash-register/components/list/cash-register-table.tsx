import { CashRegister } from '../../../../../types/configuration/cash-register';

import { useQueryClient } from '@tanstack/react-query';

import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { moveToTrash } from '../../../../../api/get-data';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { QUERY_KEYS, TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import { useGetData } from '../../../../../hooks/use-get-data';
import PopupOptions from './popup-options';
import Label from '../../../../../components/label';

// ----------------------------------------------------------------------

export default function CashRegisterTable() {
  const { data = [], isLoading } = useGetData({
    url: '/api/config/cash-register/',
    queryKey: [QUERY_KEYS.list],
  });

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/cash-register', selected),
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
      fn: (selected: Array<number | string>, selectAll: (value: boolean) => void) => {
        const arrayNumbers = onlyNumbers(selected);
        handleMoveToTrash(arrayNumbers, selectAll);
      },
    },
  ];

  const customCell = [
    {
      columnIndex: 2,
      render: (data: CashRegister) =>
        data.is_active ? (
          <Label color="success">Activo</Label>
        ) : (
          <Label color="default">Inactivo</Label>
        ),
    },
    {
      columnIndex: 3,
      render: (cashRegisterData: CashRegister) => (
        <PopupOptions data={cashRegisterData} />
      ),
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
