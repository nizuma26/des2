//@mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TABLE_COLUMNS, QUERY_KEYS } from '../../context';

import { CustomCell, RowSelectedOptions } from '../../../../../components/datatable/types';
import { Currency } from '../../../../../types/configuration/currency';

import { useGetData } from '../../../../../hooks/use-get-data';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { onlyNumbers } from '../../../../../utils/type-guard';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import PopupOptions from './popup-options';
import { moveToTrash } from '../../../../../api/get-data';

// ----------------------------------------------------------------------

export default function CurrencyTable() {
  const { data = [], isLoading } = useGetData({
    url: 'api/config/currency/',
    queryKey: [QUERY_KEYS.enabled],
  });

  const mutate = useMutateData();
  
  const handleMoveToTrash = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: moveToTrash('api/config/currency', selected),
      onSuccess: () => {
        mutate.invalidateQueries({ queryKey: [QUERY_KEYS.enabled] });
        selectAll(false);
      },
    });
  };

  const customCell:CustomCell<Currency>[] = [
    {
      columnIndex: 1,
      render: (currencyData) => (
        <Box>
          <Typography variant="subtitle2">{currencyData.name}</Typography>
          {!!currencyData.type_currency && <Label color="info">{currencyData.type_currency}</Label>}
        </Box>
      ),
    },
    {
      columnIndex: 3,
      render: (currencyData) => <PopupOptions data={currencyData} />,
    },
  ];

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

  return (
    <MuiDatatable
      data={data}
      columns={TABLE_COLUMNS}
      loading={isLoading}
      customCell={customCell}
      rowsSelectedOptions={rowSelectedOptions}
      options={{
        filterFields: ['code', 'name'],
      }}
    />
  );
}
