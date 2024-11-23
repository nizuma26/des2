//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { ModelFormDialogProps } from './types';
import { ModelFormValues } from '../../../../types/inventory/model';

import { editModel, newModel } from '../../../../api/inventory/model';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../components/dialog';

import { FORM_VALUES, QUERY_KEYS } from '../context';

import { SvgIcon } from '../../../../components/svg-color';
import Label from '../../../../components/label';
import ControlledSwitch from '../../../../components/controlled/controlled-switch';
import BrandAutocomplete from './brand-autocomplete';

//-------------------------------------------------------------------

export default function ModelFormDialog({
  values = FORM_VALUES,
  onSubmit
}: ModelFormDialogProps) {

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm<ModelFormValues>({
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
    mutationFn: isEdit ? editModel : newModel,
  });

  const mutate = useMutateData();

  const sendForm = (data: ModelFormValues) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        handleClose();
        if (isEdit && data?.id !== undefined) {
          const model = response?.data
          mutate.updateData({
            queryKey: [QUERY_KEYS.list],
            id: data.id,
            fields: ['name', 'brand_name', 'brand_id', 'is_active',],
            values: [model?.name, model?.brand_name, model?.brand_id, model?.is_active],
          });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.list], data: {...response?.data} });
        }
        onSubmit && onSubmit(response?.data)
      },
    });
  };

  const icon = isEdit ? 'ic_edit' : 'ic_add';
  const title = isEdit ? 'Modificar' : 'Registrar';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <SvgIcon icon={icon} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {title} Modelo
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
            <BrandAutocomplete name='brand' control={control} />
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
