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
import { useDialogStore } from '../../../components/dialog';

import { useMutateData } from '../../../hooks/use-mutate-data';

import { newSupplier } from '../../../api/procurement/supplier';

import { Supplier } from '../../../types/procurements/supplier';
import { BaseModalProps } from '../../../types';

import { validateFieldErrors } from '../../../utils/validate-fiels-errors';

import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import { ControlledSwitch } from '../../../components/controlled';

//-------------------------------------------------------------------

export default function CreateSupplierDialog({
  onClose = () => {},
  onSubmit = () => {},
}: BaseModalProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const defaultValues = {
    trade_name: '',
    legal_name: '',
    rif: '',
    email: '',
    phone_number: '',
    address: '',
    description: '',
    contact_person: '',
    credit_limit: 0.0,
    credit_days: 30,
    postal_code: '',
    is_active: true,
  };

  const form = useForm<Supplier>({
    defaultValues: defaultValues,
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

  const mutation = useMutation({
    mutationFn: newSupplier,
  });

  const mutate = useMutateData();

  const sendForm = (data: Supplier) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        closeDialog();
        onSubmit && onSubmit(response?.data);
      },
      onError: (error) => {
        validateFieldErrors(defaultValues, error, setError);
      },
    });
  };

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="icon-park-outline:plus" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        Nuevo proveedor
      </DialogTitle>
      <form onSubmit={handleSubmit(sendForm)} autoComplete="off">
        <DialogContent>
          <Box
            sx={{
              pt: 'none',
              columnGap: 3,
              rowGap: 4,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            <TextField
              fullWidth
              label="Nombre Comercial"
              {...register('trade_name', { required: 'Debe ingresar un nombre comercial' })}
              error={!!errors.trade_name}
              helperText={errors.trade_name?.message}
            />
            <TextField
              fullWidth
              multiline
              maxRows={3}
              label="Razón social"
              {...register('legal_name', { required: 'Debe ingresar una razón social' })}
              error={!!errors.legal_name}
              helperText={errors.legal_name?.message}
            />
            <TextField
              fullWidth
              label="RIF"
              {...register('rif', { required: 'Debe ingresar el RIF' })}
              error={!!errors.rif}
              helperText={errors.rif?.message}
            />

            <TextField
              fullWidth
              label="Correo Electrónico"
              {...register('email', {
                pattern: {
                  value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                  message: 'El correo electrónico no es valido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Número de Teléfono"
              type="number"
              {...register('phone_number', {
                minLength: {
                  value: 11,
                  message: 'El teléfono debe tener como mínimo 11 dígitos',
                },
                maxLength: {
                  value: 11,
                  message: 'El teléfono debe tener como máximo 11 dígitos',
                },
              })}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
            <TextField fullWidth label="Persona de contacto" {...register('contact_person')} />
            <TextField
              fullWidth
              defaultValue={0.0}
              label="Límite de crédito"
              type="number"
              {...register('credit_limit')}
              error={!!errors.credit_limit}
              helperText={errors.credit_limit?.message}
            />
            <TextField
              fullWidth
              defaultValue={30}
              label="Días de crédito"
              type="number"
              {...register('credit_days')}
            />
            <TextField
              label="Código postal"
              type="number"
              {...register('postal_code')}
              error={!!errors.postal_code}
              helperText={errors.postal_code?.message}
            />
          </Box>
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              mt: 4,
            }}
          >
            <TextField fullWidth label="Dirección" multiline rows={3} {...register('address')} />
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={3}
              {...register('description')}
            />
          </Box>
          <FormGroup sx={{ width: 100, mt: 2 }}>
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
