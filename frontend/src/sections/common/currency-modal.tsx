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
import { useDialogStore } from '../../components/dialog';

import { useMutateData } from '../../hooks/use-mutate-data';

import { newCurrency, editCurrency } from '../../api/configuration/currency';

import { Currency } from '../../types/configuration/currency';
import { CurrencyModalProps } from './types';

import { validateFieldErrors } from '../../utils/validate-fiels-errors';

import Iconify from '../../components/iconify';
import Label from '../../components/label';
import ControlledSwitch from '../../components/controlled/controlled-switch';

//-------------------------------------------------------------------
const DEFAULT_VALUES = {
    code: '',
    name: '',
    symbol: '',
    exchange_rate: null,
    is_default: false,
    is_active: true,
  };
  
export default function CurrencyModal({
  values = DEFAULT_VALUES,
  onClose = () => {},
  onSubmit = () => {},
}: CurrencyModalProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm<Currency>({
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

  const isEdit = !!values?.id

  const mutation = useMutation({
    mutationFn: isEdit ? editCurrency : newCurrency,
  });

  const mutate = useMutateData();

  const sendForm = (data: Currency) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['currencies'] });
        queryClient.invalidateQueries({ queryKey: ['active-currencies'] });
        closeDialog();
        onSubmit();
      },
      onError: (error) => {
        validateFieldErrors(DEFAULT_VALUES, error, setError);
      },
    });
  };

  const icon = isEdit ? 'fluent:edit-16-filled' : 'icon-park-outline:plus';
  const title = isEdit ? 'Modificar moneda' : 'Nueva moneda';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon={icon} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit(sendForm)} autoComplete="off">
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
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
              {...register('exchange_rate')}
              error={!!errors.exchange_rate}
              helperText={errors.exchange_rate?.message}
            />           
          </Box>
          <FormGroup sx={{ width: 100, mt: 2 }}>
            <ControlledSwitch name="is_default" label="Predeterminada" control={control} />
            <ControlledSwitch name="is_active" label="Activo" control={control} />
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
