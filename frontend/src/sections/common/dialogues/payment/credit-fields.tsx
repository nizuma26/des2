import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useFormContext } from 'react-hook-form';

import DueDate from './due-date';

export default function CreditFields() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const creditLimit = getValues('credit_limit');
  const creditDays = getValues('credit_days');
  const total_bs = getValues('total_bs');

  const newCreditLimit = parseFloat(creditLimit) > total_bs ? total_bs : creditLimit;

  setValue('credit_limit', newCreditLimit);

  return (
    <Box
      display="grid"
      gap={2}
      mt={3}
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
    >
      <TextField
        defaultValue={creditDays}
        fullWidth
        size="small"
        type="number"
        label="Días de crédito"
        {...register('credit_days', { required: 'Este campo es requerido' })}
        error={!!errors.credit_days}
        helperText={errors.credit_days?.message}
      />
      <TextField
        defaultValue={newCreditLimit}
        fullWidth
        size="small"
        type="number"
        label="Límite de crédito"
        {...register('credit_limit', {
          required: 'Este campo es requerido',
          min: {
            value: 1,
            message: 'El límite de credito no puede ser 0',
          },
          max: {
            value: total_bs,
            message: 'El límite de credito no puede ser mayor al total a pagar',
          },
        })}
        error={!!errors.credit_limit}
        helperText={errors.credit_limit?.message}
      />
      <DueDate />
    </Box>
  );
}
