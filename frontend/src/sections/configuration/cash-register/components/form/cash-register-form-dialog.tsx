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

import { CashRegisterFormDialogProps } from './types';
import { CashRegister } from '../../../../../types/configuration/cash-register';

import { newCashRegister, editCashRegister } from '../../../../../api/configuration/cash-register';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../../components/dialog';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import { DEFAULT_FORM_VALUES, QUERY_KEYS } from '../../context';

import { PlusIcon, EditIcon } from '../../../../../components/iconify/default-icons';
import Label from '../../../../../components/label';
import ControlledSwitch from '../../../../../components/controlled/controlled-switch';

//-------------------------------------------------------------------

export default function CashRegisterFormDialog({
  values = DEFAULT_FORM_VALUES,
  onClose = () => {},
  onSubmit = () => {},
}: CashRegisterFormDialogProps) {
  const form = useForm<CashRegister>({
    defaultValues: values,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    control
  } = form;

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const isEdit = !!values?.id;

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editCashRegister : newCashRegister,
  });

  const mutate = useMutateData();

  const sendForm = (data: CashRegister) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        if (!!values?.id) {
          mutate.updateData({
            queryKey: [QUERY_KEYS.list],
            id: values.id,
            fields: ['name', 'is_active'],
            values: [data.name, data.is_active],
          });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.list], data: { ...response?.data } });
        }
        handleClose()
        onSubmit && onSubmit(response?.data);
      },
      onError: (error) => {
        validateFieldErrors(DEFAULT_FORM_VALUES, error, setError);
      },
    });
  };

  const icon = isEdit ? <EditIcon /> : <PlusIcon />;
  const title = isEdit ? 'Modificar' : 'Nueva';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          {icon}
        </Label>
        {title} caja
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
            {isEdit && <ControlledSwitch name="is_active" label="Estado" control={control} />}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={mutation.isPending}
            startIcon={icon}
          >
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
