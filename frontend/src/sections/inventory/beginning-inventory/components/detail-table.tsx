import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { useFormContext, useFieldArray } from 'react-hook-form';

import { detail } from '../context';

import { BeginningInventoryFormData, Detail } from '../../../../types/beginning-inventory';

import '../../../../components/scrollbar/scrollbar.css';

import MuiDatatable from '../../../../components/datatable/mui-datatable';
import { ItemInventory } from '../../../../types/inventory/item';
import ItemSearch from '../../../common/autocompletes/item-search';
import { CustomCell } from '../../../../components/datatable/types';
import { SvgIcon } from '../../../../components/svg-color';
import Subtotal from './subtotal';

// ----------------------------------------------------------------------

export default function DetailTable() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BeginningInventoryFormData>();

  const { fields, append, remove } = useFieldArray<BeginningInventoryFormData>({
    name: 'detail',
    control: control,
  });

  const appendItem = (data: ItemInventory) => {
    const item: Detail = {
      item_id: data.id,
      name: `${data.name} ${data.description}`,
      stock: 1,
      category: data.category,
      price: 0.0,
      subtotal: 0.0,
    };
    append(item);
  };

  const getIds = fields.map((field) => field.item_id);

  const customCell: CustomCell<Detail>[] = [
    {
      columnIndex: 0,
      render: (currencyData, rowIndex) => (
        <IconButton color="error" onClick={() => remove(rowIndex)}>
          <SvgIcon icon="ic_trash" />
        </IconButton>
      ),
    },
    {
      columnIndex: 3,
      render: (currencyData, rowIndex) => (
        <TextField
          size="small"
          type="number"
          placeholder="Ingrese una cantidad"
          {...register(`detail.${rowIndex}.stock`, {
            required: 'Debe ingresar una cantidad',
            min: { value: 1, message: 'El stock debe ser mayor a 0' },
          })}
          error={!!errors?.detail?.[rowIndex]?.stock}
          helperText={errors?.detail?.[rowIndex]?.stock?.message}
        />
      ),
    },
    {
      columnIndex: 4,
      render: (currencyData, rowIndex) => (
        <TextField
          size="small"
          type="number"
          placeholder="Ingrese el costo unitario"
          {...register(`detail.${rowIndex}.price`, {
            required: 'Debe ingresar un costo',
            min: 1,
            valueAsNumber: true,
          })}
          error={!!errors?.detail?.[rowIndex]?.price}
          helperText={errors?.detail?.[rowIndex]?.price?.message}
        />
      ),
    },
    {
      columnIndex: 5,
      render: (currencyData, rowIndex) => <Subtotal index={rowIndex} />,
    },
  ];

  return (
    <>
      <MuiDatatable
        data={fields}
        columns={detail}
        customCell={customCell}
        options={{ checkbox: false, search: false, pagination: false, dense: false }}
        toolbarComponents={<ItemSearch itemIds={getIds} onSelected={appendItem} />}
      />
    </>
  );
}
