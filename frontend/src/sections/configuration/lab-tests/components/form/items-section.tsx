//@mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { LabTestFormValues, LabTestItems } from '../../../../../types/configuration/lab-test';

import { ITEMS_TABLE_COLUMNS, REDUCTION_TYPE } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import ItemsDatatableDialog from './items-datatable-dialog';
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { DeleteIcon } from '../../../../../components/iconify/default-icons';
//-------------------------------------------------------------

export default function ItemsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LabTestFormValues>();

  const { fields, append, remove } = useFieldArray<LabTestFormValues>({
    name: 'items',
    control: control,
  });

  const addItem = (item: LabTestItems) => {
    append({ ...item });
  };

  const itemIds = fields.map((field) => (field as LabTestItems)?.item_id);

  const customCell = [
    {
      columnIndex: 0,
      render: (data: LabTestItems, rowIndex: number) => (
        <IconButton
          color="error"
          aria-label="add"
          onClick={() => remove(rowIndex)}
          sx={{ width: 36, height: 36 }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      columnIndex: 2,
      render: (data: LabTestItems, rowIndex: number) => (
        <TextField
          defaultValue={data?.quantity}
          fullWidth
          size="small"
          type="number"
          {...register(`items.${rowIndex}.quantity`, {
            required: 'Debe ingresar una cantidad',
            min: {
              value: 1,
              message: 'El valor mínimo aceptado es 1',
            },
          })}
          label="Cantidad requerida"
          error={!!errors?.items?.[rowIndex]?.quantity}
          helperText={errors?.items?.[rowIndex]?.quantity?.message}
        />
      ),
    },
    {
      columnIndex: 3,
      render: (data: LabTestItems, rowIndex: number) => (
        <Stack py={1}>
          <ControlledSelect
            size="small"
            defaultValue={data?.reduction_type}
            control={control}
            options={REDUCTION_TYPE}
            name={`items.${rowIndex}.reduction_type`}
            label="Tipo de reducción"
          />
        </Stack>
      ),
    },
  ];

  return (
    <Stack px={0} spacing={2}>
      <Stack direction="row" spacing={2} p={2} alignItems="center">
        <Typography>Buscar artículos </Typography>
        <ItemsDatatableDialog itemIds={itemIds} addItem={addItem} />
        <Label color="primary">agregados: {fields.length}</Label>
      </Stack>
      <Stack
        spacing={2}
        width={2000}
        maxHeight={460}
        overflow="scroll"
        className="scrollbar"
        px={0}
      >
        <MuiDatatable
          data={fields as LabTestItems[]}
          columns={ITEMS_TABLE_COLUMNS}
          customCell={customCell}
          options={{
            checkbox: false,
            pagination: false,
            toolbar: false,
            dense: false,
            search: false,
          }}
          sx={{ table: { size: 'small' } }}
        />
      </Stack>
    </Stack>
  );
}
