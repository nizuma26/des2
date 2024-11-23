import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { RowSelectedOptions } from '../../../../../components/datatable/types';
import { OrderDetailTableProps } from '../types';
import { Columns } from '../../../../../types/ui';
import { OrderDetail, OrderFormValues } from '../../../../../types/orders/orders';
import { LabTest } from '../../../../../types/configuration/lab-test-profile';

import { useDialogStore } from '../../../../../components/dialog';

import { onlyNumbers } from '../../../../../utils/type-guard';

import { MuiDatatable } from '../../../../../components/datatable';
import LabTestSearch from '../../../../common/autocompletes/lab-test-search';
import ApplyDiscountDialog from './apply-discount-dialog';
// ----------------------------------------------------------------------

export default function OrderDetailTable({
  exchangeRate,
  mainCurrencyCode,
  secondaryCurrencyCode,
}: OrderDetailTableProps) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const showDialog = useDialogStore((state) => state.showDialog);

  const { fields, append, remove } = useFieldArray<OrderFormValues>({
    name: 'detail',
    control: control,
  });

  const costType = useWatch({
    name: 'cost_type',
    control: control,
  });

  // const applyDiscount = () => {

  // }

  const labTestIds = fields?.map((field) => (field as OrderDetail)?.uuid);

  const addLabTest = (data: LabTest) => {
    append({
      uuid: data.uuid,
      name: data.name,
      abbreviation: data.abbreviation,
      price: data[costType] ?? 0,
      secondary_price: data.standard,
      discount: 0,
      standard: data.standard,
      emergency: data.emergency,
      affiliated: data.affiliated,
      home_service: data.home_service,
      holiday: data.holiday,
      exempt: data.exempt,
    });
  };

  const removeLabTest = (selected: number[]) => {
    //Se obtienen los índices de los artirulos cuyo ids coincidan a los artículos seleccionados
    let indexes = fields.reduce((acc: number[], labTest, index) => {
      if (selected.includes((labTest as OrderDetail)?.uuid)) {
        acc.push(index);
      }
      return acc;
    }, []);

    remove(indexes);
  };

  const applyDiscount = (
    discount: number,
    selected: number[],
    setCheckAll: (checked: boolean) => void
  ) => {
    //Se obtienen los índices de los artirulos cuyo ids coincidan a los examenes seleccionados
    let indexes = fields.reduce((acc: number[], labTest, index) => {
      if (selected.includes((labTest as OrderDetail)?.uuid)) {
        acc.push(index);
      }
      return acc;
    }, []);

    indexes.forEach((index) => setValue(`detail.${index}.discount`, discount));
    setCheckAll(false);
  };

  const openDiscountDialog = (selected: number[], setCheckAll: (checked: boolean) => void) => {
    showDialog(
      <ApplyDiscountDialog
        applyDiscount={applyDiscount}
        selected={selected}
        setCheckAll={setCheckAll}
      />
    );
  };

  const autocomplete = <LabTestSearch addLabTest={addLabTest} labTestIds={labTestIds} />;

  const DETAIL_TABLE_COLUMNS: Array<Columns> = [
    { id: 'name', label: 'Examen', sort: false, width: 'auto' },
    { id: 'discount', label: 'Descuento', sort: false, width: '19%' },
    {
      id: 'price',
      label: `Precio (${mainCurrencyCode})`,
      sort: false,
      align: 'center',
      width: '15%',
    },
    {
      id: 'secondary_price',
      label: `Precio en divisa (${secondaryCurrencyCode})`,
      sort: false,
      align: 'center',
      width: '15%',
    },
  ];

  const customCell = [
    {
      columnIndex: 0,
      render: (data: OrderDetail) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <ListItemText>
            <Typography variant="subtitle2" fontSize={13}>
              {data.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {data.abbreviation}
            </Typography>
          </ListItemText>
        </Stack>
      ),
    },
    {
      columnIndex: 1,
      render: (data: OrderDetail, rowIndex: number) => (
        <>
          <OutlinedInput
            size="small"
            placeholder="Desc..."
            {...register(`detail.${rowIndex}.discount`, {
              required: 'No puede estar vacio',
              min: { value: 0, message: 'Valor invalido' },
              max: { value: 100, message: 'Máximo 100%' },
            })}
            error={!!errors.detail?.[rowIndex]?.discount}
          />
          <FormHelperText error={!!errors.detail?.[rowIndex]?.discount}>
            {errors.detail?.[rowIndex]?.discount?.message}
          </FormHelperText>
        </>
      ),
    },
    {
      columnIndex: 2,
      render: (data: OrderDetail, rowIndex: number) => {
        const newPrice = data[costType] || 0;
        setValue(`detail.${rowIndex}.price`, newPrice);
        return <> {newPrice} </>;
      },
    },
    {
      columnIndex: 3,
      render: (data: OrderDetail) => {
        const newMainPrice = data[costType] || 0;
        const newSecondaryPrice = newMainPrice / exchangeRate;
        return <> {newSecondaryPrice.toFixed(2)} </>;
      },
    },
  ];

  const rowSelectedOptions: RowSelectedOptions[] = [
    {
      tooltip: 'Eliminar',
      icon: 'solar:trash-bin-minimalistic-bold',
      alertOptions: {
        content: `¿Esta seguro de remover los examenes seleccionados del detalle?`,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        removeLabTest(arrayNumbers), selectAll(false);
      },
    },
    {
      tooltip: 'Aplicar descuento general',
      icon: 'fluent:edit-16-filled',
      alertOptions: {
        disable: true,
      },
      fn: (selected, selectAll) => {
        const arrayNumbers = onlyNumbers(selected);
        openDiscountDialog(arrayNumbers, selectAll)
      },
    },
  ];

  return (
    <>
      <MuiDatatable
        data={fields as OrderDetail[]}
        columns={DETAIL_TABLE_COLUMNS}
        options={{
          checkbox: true,
          search: false,
          pagination: false,
          dense: false,
          selectField: 'uuid',
          key: 'uuid',
        }}
        customCell={customCell}
        toolbarComponents={autocomplete}
        rowsSelectedOptions={rowSelectedOptions}
        sx={{ table: { size: 'small', scrollY: 350, scrollX: 200 } }}
      />
    </>
  );
}
