import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  PurchaseRequisitionDetail,
  PurchaseRequisitionFormValues,
} from '../../../../../types/procurements/purchase-requisition';
import { ItemInventory } from '../../../../../types/inventory/item';
import { RowSelectedOptions } from '../../../../../components/datatable/types';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { DETAIL_TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
import ItemSearch from '../../../../common/autocompletes/item-search';

// ----------------------------------------------------------------------

export default function RequisitionDetailTable() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PurchaseRequisitionFormValues>();

  const { fields, append, remove } = useFieldArray<PurchaseRequisitionFormValues>({
    name: 'detail',
    control: control,
  });

  const itemIds = fields?.map((field) => field?.item_id);

  const removeItems = (selected: number[]) => {
    //Se obtienen los índices de los artirulos cuyo ids coincidan a los artículos seleccionados
    let indexes = fields.reduce((acc: number[], item, index) => {
      if (selected.includes(item.item_id)) {
        acc.push(index);
      }
      return acc;
    }, []);

    remove(indexes);
  };

  const appendItem = (data: ItemInventory) => {
    const item: PurchaseRequisitionDetail = {
      item_id: data.id,
      item_name: `${data.name} ${data.description}`,
      quantity: 1,
      item_category: data.category,
      item_measure_unit: data.measure_unit,
    };
    append(item);
  };

  const autocomplete = <ItemSearch itemIds={itemIds} onSelected={appendItem} />;

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseRequisitionDetail) => {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Label color="primary" sx={{ minWidth: 40, borderRadius: '30%', py: '20px', px: '10px', }}>
              <Iconify icon="solar:box-bold-duotone" width={22} sx={{ opacity: 0.86 }} />
            </Label>
            <ListItemText>
              <Typography variant="subtitle2">{data.item_name}</Typography>
              <Typography variant="caption" color="text.disabled">
                {data?.item_code}
              </Typography>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 1,
      render: (data: PurchaseRequisitionDetail, rowIndex: number) => (
        <>
          <OutlinedInput
            size="small"
            placeholder="Desc..."
            {...register(`detail.${rowIndex}.quantity`, {
              required: 'Campor requerido',
              min: { value: 1, message: 'El valor mínimo válido es 1' },
            })}
            error={!!errors.detail?.[rowIndex]?.quantity}
          />
          <FormHelperText error={!!errors.detail?.[rowIndex]?.quantity}>
            {errors.detail?.[rowIndex]?.quantity?.message}
          </FormHelperText>
        </>
      ),
    },
    {
      columnIndex: 2,
      render: (data: PurchaseRequisitionDetail) => (
        <>
        {console.log(data.item_measure_unit)}
        <Label color="primary">{data.item_measure_unit}</Label>
        </>
      ),
    },
  ];

  const rowSelectedOptions:RowSelectedOptions[] = [
    {
      tooltip: 'Remover',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de remover los artículos de su detalle?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        removeItems(arrayNumbers), selectAll(false);
      },
    }
  ];

  return (
    <>
      <MuiDatatable
        data={fields}
        columns={DETAIL_TABLE_COLUMNS}
        options={{
          checkbox: true,
          search: false,
          pagination: false,
          dense: false,
          selectField: 'item_id',
        }}
        customCell={customCell}
        toolbarComponents={autocomplete}
        rowsSelectedOptions={rowSelectedOptions}
        sx={{ table: { size: 'small', scrollY: 350 } }}
      />
    </>
  );
}
