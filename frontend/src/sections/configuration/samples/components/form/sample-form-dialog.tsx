//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { SampleFormDialogProps } from './types';
import { Sample } from '../../../../../types/configuration/samples';

import { newSample, editSample } from '../../../../../api/configuration/samples';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../../components/dialog';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import { DEFAULT_FORM_VALUES, QUERY_KEYS } from '../../context';

import { SvgIcon } from '../../../../../components/svg-color';
import Label from '../../../../../components/label';

//-------------------------------------------------------------------

export default function SampleFormDialog({
  values = DEFAULT_FORM_VALUES,
  onClose = () => {},
  onSubmit = () => {},
}: SampleFormDialogProps) {
  
  const form = useForm<Sample>({
    defaultValues: values,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = form;

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const isEdit = !!values?.id;

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editSample : newSample,
  });

  const mutate = useMutateData();

  const sendForm = (data: Sample) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        if (isEdit && data?.id !== undefined) {
          mutate.updateData({
            queryKey: [QUERY_KEYS.enabled],
            id: data.id,
            fields: ['name', 'is_active'],
            values: [data.name, data.is_active],
          });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.enabled], data: { ...response?.data } });
        }
        handleClose()
        onSubmit && onSubmit(response?.data);
      },
      onError: (error) => {
        validateFieldErrors(DEFAULT_FORM_VALUES, error, setError);
      },
    });
  };

  const icon = isEdit ? <SvgIcon icon='ic_edit' /> : <SvgIcon icon='ic_add' />;
  const title = isEdit ? 'Modificar' : 'Registrar';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          {icon}
        </Label>
        {title} Tipo de Muestra
      </DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit(sendForm)}>
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
            }}
          >
            <TextField
              defaultValue={values?.name}
              label="Nombre"
              fullWidth
              {...register('name', { required: 'El nombre es requerido' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            color='inherit'
            loading={mutation.isPending}
            startIcon={icon}
          >
            {title}
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
