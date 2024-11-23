import { useState } from 'react';
//@mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { PaymentDialogProps } from './types';
import { PatientPaymentFormValues } from '../../../../types/orders/payments';

import { PAYMENT, QUERY_KEYS } from './context';

import { newPatientPayment } from '../../../../api/orders/patient-payments';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { useDialogStore } from '../../../../components/dialog';

import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import ControlledSelect from '../../../../components/controlled/controlled-select';
import BankSearch from '../../autocompletes/bank-search';
import PaymentTable from './payment-table';

//-------------------------------------------------------------------

export default function PaymentFormDialog({
  orderId,
  balance,
  secondaryTotal,
  mainCurrencyCode,
  secondaryCurrencyCode,
  orderCode,
  onClose,
  onSubmit,
}: PaymentDialogProps) {

  const [debt, setDebt] = useState(balance);

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<PatientPaymentFormValues>({
    defaultValues: {
      order: orderId,
      payment_amount: balance,
      payment_method: 'Efectivo',
      payment_ref: '',
      comment: '',
      bank: null,
    },
  });

  const mutation = useMutation({
    mutationFn: newPatientPayment,
  });

  const { submit, invalidateQueries } = useMutateData();

  const sendForm = (data: PatientPaymentFormValues) => {
    submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        const newAmount = response.data.balance;
        newAmount === 0
          ? setDebt(newAmount)
          : setValue("payment_amount", newAmount)
        invalidateQueries({ queryKey: [QUERY_KEYS.payments, orderId] });
        onSubmit && onSubmit(response.data);
      },
    });
  };

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };

  const title = debt === 0 ? 'Abonos' : 'Abonar';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Box width={1} display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
          <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
            <Iconify icon="fluent:wallet-credit-card-20-filled" />
          </Label>
          <Typography>
            {title}: {orderCode}
          </Typography>
        </Box>

        <IconButton onClick={handleClose}>
          <Iconify icon="mingcute:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, px: 0 }} className="scrollbar">
        <Stack spacing={3}>
          {debt !== 0 && (
            <form id="payment-form" onSubmit={handleSubmit(sendForm)} autoComplete='off'>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  px: 3,
                }}
              >
                <Box display="flex" justifyContent="center" gap={3}>
                  <Stack flexDirection="column" textAlign="center" gap={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      TOTAL {`(${mainCurrencyCode})`}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {balance.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="column" textAlign="center" gap={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      TOTAL EN DIVISA {`(${secondaryCurrencyCode})`}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {secondaryTotal}
                    </Typography>
                  </Stack>
                </Box>
                <Stack
                  width={1}
                  borderRadius={2}
                  spacing={2}
                  bgcolor="rgba(105, 158, 171, 0.04)"
                  p={3}
                >
                  <Box
                    width={1}
                    display="grid"
                    gap={2}
                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                  >
                    <TextField
                      defaultValue={balance}
                      size="small"
                      {...register('payment_amount', {
                        required: 'Debe ingresar un pago',
                        min: { value: 1, message: 'El valor mínimo valido es 1' },
                        pattern: {
                          value: /^-?\d+\.?\d*$/,
                          message: 'Solo se permiten números enteros y decimales',
                        },
                      })}
                      label="Monto"
                      fullWidth
                      sx={{ ...styleInput }}
                      error={!!errors?.payment_amount}
                      helperText={errors.payment_amount?.message}
                    />
                    <ControlledSelect
                      defaultValue="Efectivo"
                      control={control}
                      name="payment_method"
                      options={PAYMENT.methods}
                      label="Forma de pago"
                      size="small"
                    />

                    <TextField
                      size="small"
                      {...register('payment_ref')}
                      label="Ref#"
                      fullWidth
                      sx={{ ...styleInput }}
                    />
                    <BankSearch control={control} name="bank" size="small" />
                  </Box>
                  <Box width={1} mb={2}>
                    <TextField
                      size="small"
                      multiline
                      {...register('comment')}
                      label="Comentario"
                      rows={2}
                      fullWidth
                    />
                  </Box>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={mutation.isPending}
                    startIcon={<Iconify icon="mingcute:add-circle-fill" />}
                    sx={{ boxShadow: 'inherit', mt: 2 }}
                  >
                    Agregar abono
                  </LoadingButton>
                </Stack>
              </Box>
            </form>
          )}
          <PaymentTable orderId={orderId} hasDebt={!!balance} />
        </Stack>
      </DialogContent>
    </>
  );
}
