import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useFormContext, useFieldArray } from 'react-hook-form';

import { useDialogStore } from '../../../../../components/dialog';

import { Purchase } from '../../../../../types/procurements/purchase';
import { PurchaseDetail } from '../../../../../types/procurements/purchase';

import { detail } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import AutocompleteItems from './autocomplete-items';
import { SelectedCurrencyValue } from './selected-currency-value';
import ItemModalForm from '../../../common/item-modal/item-modal-form';
import PopupOptions from './popup-options';

// ----------------------------------------------------------------------

export default function DetailTable() {
  const { control } = useFormContext<Purchase>();

  const { fields, append, update, remove } = useFieldArray<Purchase>({
    name: 'detail',
    control: control,
  });

  const showDialog = useDialogStore.getState().showDialog;

  const getIds = fields?.map((field) => field?.item_id);

  const addOrUpdate = (data: PurchaseDetail, index?: number) => {
    index !== undefined ? update(index, { ...data }) : append({ ...data });
  };

  const showItemModalForm = (indexItem: number, data: PurchaseDetail) => {
    showDialog(
      <ItemModalForm item={data} indexItem={indexItem} addOrUpdate={addOrUpdate} action="edit" />,
      'md'
    );
  };

  const autocomplete = (
    <AutocompleteItems
      addOrUpdate={addOrUpdate}
      remove={remove}
      numberItems={fields.length}
      itemIds={getIds}
    />
  );

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseDetail, rowIndex: number) => (
        <Stack direction="column">
          <Typography variant="subtitle2">{data.item}</Typography>
          <Typography variant="caption" color="text.secondary">
            {data?.item_code}
          </Typography>
        </Stack>
      ),
    },
    {
      columnIndex: 3,
      render: (data: PurchaseDetail, rowIndex: number) => (
        <SelectedCurrencyValue
          indexField={rowIndex}
          field="selected_currency_cost"
          value={data.cost_bs}
        />
      ),
    },
    {
      columnIndex: 4,
      render: (data: PurchaseDetail, rowIndex: number) => <>% {data.tax}</>,
    },
    {
      columnIndex: 5,
      render: (data: PurchaseDetail, rowIndex: number) => <>% {data.discount}</>,
    },
    {
      columnIndex: 6,
      render: (data: PurchaseDetail, rowIndex: number) => <>{Number(data.total_bs).toFixed(2)}</>,
    },
    {
      columnIndex: 7,
      render: (data: PurchaseDetail, rowIndex: number) => (
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <SelectedCurrencyValue
            indexField={rowIndex}
            field="selected_currency_total"
            value={data.total_bs}
          />
          <PopupOptions
            removeItem={() => remove(rowIndex)}
            updateItem={() => showItemModalForm(rowIndex, data)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={fields}
        columns={detail}
        options={{ checkbox: false, search: false, pagination: false, dense: false }}
        customCell={customCell}
        toolbarComponents={autocomplete}
        sx={{ table: { size: 'small', scrollY: 350 } }}
      />
    </>
  );
}
