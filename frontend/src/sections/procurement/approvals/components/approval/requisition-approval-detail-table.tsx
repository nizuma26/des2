import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  PurchaseRequisitionFormValues,
  PurchaseRequisitionDetail,
} from '../../../../../types/procurements/purchase-requisition';

import { REQUISITION_DETAIL_TABLE_COLUMNS } from '../../context';

import { MuiDatatable } from '../../../../../components/datatable';
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

export default function RequisitionApprovalDetailTable() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PurchaseRequisitionFormValues>();

  const { fields } = useFieldArray<PurchaseRequisitionFormValues>({
    name: 'detail',
    control: control,
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: PurchaseRequisitionDetail, rowIndex: number) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Label color="primary" sx={{ minWidth: 40, borderRadius: '30%', py: '20px', px: '10px' }}>
            <Iconify icon="solar:box-bold-duotone" width={22} sx={{ opacity: 0.86 }} />
          </Label>
          <ListItemText>
            <Typography variant="subtitle2">{data.item_name}</Typography>
            <Typography variant="caption" color="text.disabled">
              {data?.item_code}
            </Typography>
          </ListItemText>
        </Stack>
      ),
    },
    {
      columnIndex: 1,
      render: (data: PurchaseRequisitionDetail, rowIndex: number) => (
        <Label color="secondary">{data.quantity}</Label>
      ),
    },
    {
      columnIndex: 2,
      render: (data: PurchaseRequisitionDetail, rowIndex: number) => (
        <Label color="primary">{data.item_measure_unit}</Label>
      ),
    },
    {
      columnIndex: 3,
      render: (data: PurchaseRequisitionDetail, rowIndex: number) => (
        <TextField
          defaultValue={data.quantity}
          size="small"
          placeholder="Ingrese una cantidad"
          {...register(`detail.${rowIndex}.approved_amount`, {
            required: 'Debe ingresar una cantidad',
            min: {
              value: 0,
              message: 'No se aceptan números negativos',
            },
            max: {
              value: Number(data.quantity),
              message: 'No puede ingresar una cantidad mayor a la cantidad solicitada',
            },
          })}
          error={!!errors?.detail?.[rowIndex]?.approved_amount}
          helperText={errors?.detail?.[rowIndex]?.approved_amount?.message}
        />
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={fields}
        columns={REQUISITION_DETAIL_TABLE_COLUMNS}
        options={{
          checkbox: false,
          search: false,
          pagination: false,
          dense: true,
          toolbar: false,
          selectField: 'item_id',
        }}
        customCell={customCell}
        sx={{ table: { scrollY: 390 } }}
      />
    </>
  );
}
