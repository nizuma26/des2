//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { BrandFormDialogProps } from './types';
import { GenericValues } from '../../../../types';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../components/dialog';

import { FORM_VALUES, QUERY_KEYS } from '../context';

import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import ControlledSwitch from '../../../../components/controlled/controlled-switch';
import { editBrand, newBrand } from '../../../../api/inventory/brand';

//-------------------------------------------------------------------

export default function BrandFormDialog({
  values = FORM_VALUES,
  onSubmit
}: BrandFormDialogProps) {

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm<GenericValues>({
    defaultValues: values
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = form;

  const isEdit = !!values.id;

  const handleClose = () => {
    reset();
    closeDialog()
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editBrand : newBrand,
  });

  const mutate = useMutateData();

  const sendForm = (data: GenericValues) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        handleClose();
        if (isEdit && data?.id !== undefined) {
          mutate.updateData({
            queryKey: [QUERY_KEYS.list],
            id: data.id,
            fields: ['name', 'is_active'],
            values: [data.name, data.is_active],
          });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.list], data: {...response?.data} });
        }
        onSubmit && onSubmit(response?.data)
      },
    });
  };


  const icon = isEdit ? 'fluent:edit-16-filled' : 'icon-park-outline:plus';
  const title = isEdit ? 'Modificar marca' : 'Nueva marca';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon={icon} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {title}
      </DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit(sendForm)}>
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <TextField
              defaultValue={values.name}
              sx={{ mb: 2 }}
              margin="dense"
              fullWidth
              label="Nombre"
              {...register('name', { required: 'El nombre es requerido' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            {isEdit && <ControlledSwitch name="is_active" label="Estado" control={control} />}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <LoadingButton type="submit" variant="contained" color='inherit' loading={false}>
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
