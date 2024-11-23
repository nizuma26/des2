import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  ReceivingPurchaseDetail,
  ReceivingPurchaseFormValues,
} from '../../../../../types/procurements/receiving-order';

import { DETAIL_TABLE_COLUMNS } from '../../context';

import MuiDatatable from '../../../../../components/datatable/mui-datatable';
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
import ReceivedQuantity from './received-quantity';
import CommentDialog from './comment-dialog';

// ----------------------------------------------------------------------

export default function ReceivingOrderDetailTable() {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ReceivingPurchaseFormValues>();

  const { fields } = useFieldArray<ReceivingPurchaseFormValues>({
    name: 'detail',
    control: control,
  });

  const customCell = [
    {
      columnIndex: 0,
      render: (data: ReceivingPurchaseDetail) => {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Label
              color="primary"
              sx={{ minWidth: 40, borderRadius: '30%', py: '20px', px: '10px' }}
            >
              <Iconify icon="solar:box-bold-duotone" width={22} sx={{ opacity: 0.86 }} />
            </Label>
            <ListItemText>
              <Typography variant="subtitle2">
                {data.item_name} {data.item_description}
              </Typography>
              <Box display="flex" gap={2}>
                <Typography variant="caption" color="text.secondary" gap={2}>
                  {data?.item_code}
                </Typography>
              </Box>
            </ListItemText>
          </Stack>
        );
      },
    },
    {
      columnIndex: 1,
      render: (data: ReceivingPurchaseDetail, rowIndex: number) => (
        <>
          <OutlinedInput
            type="number"
            defaultValue={0}
            size="small"
            placeholder="Cantidad recibida"
            {...register(`detail.${rowIndex}.received_quantity`, {
              required: 'Campo requerido',
              min: { value: 0, message: 'No se aceptan valores negativos' },
              max: {
                value: data.expected_quantity,
                message: `La cantidad no puede ser mayor a ${data.expected_quantity}`,
              },
            })}
            error={!!errors.detail?.[rowIndex]?.received_quantity}
          />
          <FormHelperText error={!!errors.detail?.[rowIndex]?.received_quantity}>
            {errors.detail?.[rowIndex]?.received_quantity?.message}
          </FormHelperText>
        </>
      ),
    },
    {
      columnIndex: 2,
      render: (data: ReceivingPurchaseDetail, rowIndex: number) => (
        <ReceivedQuantity
          control={control}
          index={rowIndex}
          expectedQuantity={data.expected_quantity}
        />
      ),
    },
    {
      columnIndex: 3,
      render: (data: ReceivingPurchaseDetail, rowIndex: number) => (
        <Box width={1} display="flex" gap={1}>
          <CommentDialog
            addComment={(comment) => setValue(`detail.${rowIndex}.comment`, comment)}
            value={data?.comment}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <MuiDatatable
        data={fields}
        columns={DETAIL_TABLE_COLUMNS}
        options={{
          checkbox: false,
          search: false,
          pagination: false,
          dense: false,
          toolbar: false,
        }}
        customCell={customCell}
        sx={{ table: { size: 'small', scrollY: 350 } }}
      />
    </>
  );
}
