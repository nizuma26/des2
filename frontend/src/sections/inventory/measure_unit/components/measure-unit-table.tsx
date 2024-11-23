import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';

import { RowSelectedOptions } from '../../../../components/datatable/types';
import { GenericValues } from '../../../../types';

import { bulkDelete, changeStates } from '../../../../api/get-data';

import { headLabel } from '../context';

import { useGetData } from '../../../../hooks/use-get-data';
import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../components/dialog';

import { onlyNumbers } from '../../../../utils/type-guard';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import Label from '../../../../components/label';
import RecycleBin from '../../../common/recycle-bin';
import PopupOptions from './popup-options';
import AdvancedOptionsPopover from '../../../common/advanced-options-popover';

// ----------------------------------------------------------------------

interface ChangeStates {
  action: string; selected: Array<number>;  selectAll: (value: boolean) => void
}

export default function MeasureUnitTable() {

  const { data, isLoading } = useGetData({
    url: '/api/inventory/measure_unit/',
    queryKey:  ['measure-units']
  })

  const queryClient = useQueryClient();

  const mutate = useMutateData();

  const showDialog = useDialogStore((state) => state.showDialog);

  const handleBulkDelete = (selected: Array<number>, selectAll: (value: boolean) => void) => {
    mutate.submit({
      promise: bulkDelete('api/inventory/measure_unit/bulk_destroy/', selected),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['measure-units'] })
        selectAll(false)
      },
    })
  };

  const handleChangeStates = ({ action = 'disable', selected, selectAll }: ChangeStates) => {
    mutate.submit({
      promise: changeStates('api/inventory/measure_unit/change_states/', selected, action),
      onSuccess: (response) => {
        if (response?.total && response?.total > 0) queryClient.invalidateQueries({ queryKey: ['measure-units'] })
        selectAll(false)
      },
    })
  };

  const customCell = [
    {
      columnIndex: 1,
      render: (data: GenericValues) =>
        data.is_active ? (
          <Label color="success">Activo</Label>
        ) : (
          <Label color="error">Inactivo</Label>
        ),
    },
    {
      columnIndex: 2,
      render: (data: GenericValues) => (
        <PopupOptions data={data} />

      ),
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de eliminar las unidades de medida seleccionadas?`,
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
        content: `¿Esta seguro de inactivar las unidades de medida seleccionadas?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'disable', selected: arrayNumbers, selectAll: selectAll });
      }
    },
    {
      tooltip: 'Activar',
      icon: 'solar:check-read-bold',
      alertOptions: {
        content: `¿Esta seguro de activar las unidades de medida seleccionadas?`,
      },
      fn: (selected, selectAll) =>{
        const arrayNumbers = onlyNumbers(selected);
        handleChangeStates({ action: 'enable', selected: arrayNumbers, selectAll: selectAll });
      }
    },
  ];

  const advancedOptions = (
    <Stack width={1} direction="row" justifyContent="flex-end">
      <AdvancedOptionsPopover
        options={[
          {
            label: 'Ver papelera',
            icon: 'solar:trash-bin-minimalistic-bold',
            fn: () =>
              showDialog(
                <RecycleBin
                  fetchOptions={{
                    url: '/api/inventory/measure_unit/?state=false',
                    queryKey: ['measure-units-deleted'],
                    mutateFn: () => {},
                  }}
                />,
                'md'
              ),
          },
        ]}
      />
    </Stack>
  );

  return (
    <>
      <MuiDatatable
        data={data}
        columns={headLabel}
        loading={isLoading}
        options={{ filterFields: ['name', 'is_active'] }}
        rowsSelectedOptions={rowSelectedOptions}
        toolbarComponents={advancedOptions}
        customCell={customCell}
      />
    </>
  );
}
