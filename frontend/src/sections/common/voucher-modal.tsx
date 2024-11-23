//@mui
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMutateData } from '../../hooks/use-mutate-data';
import useDialogStore from '../../components/dialog/use-dialog';

import { newVoucher, editVoucher } from '../../api/payment/voucher';

import { VoucherModalProps } from './types';

import { Generic } from '../../types';

import Iconify from '../../components/iconify';
import Label from '../../components/label';
import ControlledSwitch from '../../components/controlled/controlled-switch';

const DEFAULT_VALUES = {
  name: '',
  generate_account: false,
  is_active: true,
};

export default function VoucherModal({
  values = DEFAULT_VALUES,
  onClose = () => {},
  onSubmit = () => {},
}: VoucherModalProps) {

  const form = useForm<Generic>({
    defaultValues: values,
  });

  const closeDialog = useDialogStore(state => state.closeDialog);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = form;

  const isEdit = values && values.id;

  const handleClose = () => {
    closeDialog(), reset();
    onClose && onClose();
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: isEdit ? editVoucher : newVoucher,
  });

  const mutate = useMutateData();

  const sendForm = (data: Generic) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['vouchers'] });
        queryClient.invalidateQueries({ queryKey: ['active_vouchers'] });
        closeDialog();
        onSubmit();
      },
    });
  };

  const icon = isEdit ? 'fluent:edit-16-filled' : 'icon-park-outline:plus';
  const title = isEdit ? 'Modificar comprobante' : 'Nuevo comprobante';

  return (
    <>
      <form onSubmit={handleSubmit(sendForm)}>
        <DialogTitle display="flex" alignItems="center" gap={1} mb={2} typography="subtitle2">
          <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
            <Iconify icon={icon} width={22} sx={{ opacity: 0.86 }} />
          </Label>
          {title}
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mb: 2 }}
            margin="dense"
            defaultValue={values?.name}
            fullWidth
            label="Nombre"
            {...register('name', { required: 'El nombre es requerido' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <ControlledSwitch name="is_active" label="Activar" control={control} />
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
