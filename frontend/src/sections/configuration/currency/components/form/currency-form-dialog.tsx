//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';

import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDialogStore } from '../../../../../components/dialog';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { newCurrency, editCurrency } from '../../../../../api/configuration/currency';

import { FORM_VALUES, QUERY_KEYS, TYPE_CURRENCY } from '../../context';

import { BaseModalProps } from '../../../../../types';
import { CurrencyFormValues } from '../../../../../types/configuration/currency';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import { SvgIcon } from '../../../../../components/svg-color';
import Label from '../../../../../components/label';
import ControlledSwitch from '../../../../../components/controlled/controlled-switch';
import ControlledSelect from '../../../../../components/controlled/controlled-select';
import CurrencyTax from './currency-tax';

//-------------------------------------------------------------------

interface CurrencyModalProps extends BaseModalProps {
  values?: CurrencyFormValues;
}

export default function CurrencyFormDialog({
  values = FORM_VALUES,
  onClose,
  onSubmit,
}: CurrencyModalProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm<CurrencyFormValues>({
    defaultValues: values,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    control,
  } = form;

  const handleClose = () => {
    closeDialog(), reset();
    onClose && onClose();
  };

  const queryClient = useQueryClient();

  const isEdit = !!values?.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editCurrency : newCurrency,
  });

  const mutate = useMutateData();

  const sendForm = (data: CurrencyFormValues) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.enabled] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.exchangeRate] });
        closeDialog();
        onSubmit && onSubmit(data);
      },
      onError: (error) => {
        validateFieldErrors(FORM_VALUES, error, setError);
      },
    });
  };

  const icon = isEdit ? 'ic_edit' : 'ic_add';
  const title = isEdit ? 'Modificar moneda' : 'Nueva moneda';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <SvgIcon icon={icon} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit(sendForm)} autoComplete="off">
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(2, 1fr)',
              mb: 3
            }}
          >
            <TextField
              defaultValue={values?.code}
              fullWidth
              label="Código"
              {...register('code', { required: 'El código es requerido' })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
            <TextField
              defaultValue={values?.name}
              fullWidth
              label="Nombre"
              {...register('name', { required: 'El nombre es requerido' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              defaultValue={values?.symbol}
              fullWidth
              label="Símbolo"
              {...register('symbol')}
              error={!!errors.symbol}
              helperText={errors.symbol?.message}
            />
            <TextField
              defaultValue={values?.exchange_rate}
              fullWidth
              label="Tasa de cambio"
              {...register('exchange_rate', {
                min: { value: 1, message: 'La tasa de cambio no puede ser menor a 1' },
              })}
              error={!!errors.exchange_rate}
              helperText={errors.exchange_rate?.message}
            />
          </Box>
            <ControlledSelect
              control={control}
              name="type_currency"
              options={TYPE_CURRENCY}
              label="Tipo de moneda"
              isRequired={false}
            />
          <CurrencyTax control={control} />
          <FormGroup sx={{ width: 1, mt: 2 }}>
            <ControlledSwitch name="with_tax" label="¿Aplica impuesto?" control={control} />
            <ControlledSwitch name="is_foreign" label="¿Es moneda extranjera?" control={control} />
          </FormGroup>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={mutation.isPending}>
            Guardar
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
