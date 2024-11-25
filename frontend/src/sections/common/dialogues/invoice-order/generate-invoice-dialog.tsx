//@mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { GenerateInvoiceDialogProps } from './types';
import { OrderInvoiceFormValues } from '../../../../types/orders/order-invoice';

import { generateOrderInvoice } from '../../../../api/orders/order-invoice';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import useDialogStore from '../../../../components/dialog/use-dialog';

import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';

// --------------------------------------------------------------

function GenerateInvoiceDialog({
  orderId,
  orderCode,
  cedulaOrRif,
  clientName,
  address,
  phone_number,
  paymentType,
  total,
  secondaryTotal,
  amoundPaid,
  onClose,
  onSubmit,
}: GenerateInvoiceDialogProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const status = total !== amoundPaid ? 'Pendiente' : 'Pagado';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInvoiceFormValues>({
    defaultValues: {
      orders: [orderId],
      comment: '',
      client_name: clientName,
      ci_or_rif: cedulaOrRif,
      address: address,
      total: total,
      secondary_total: secondaryTotal,
      payment_type: paymentType,
      status: status,
    },
  });

  const mutation = useMutation({
    mutationFn: generateOrderInvoice,
  });

  const { submit } = useMutateData();

  const sendForm = (data: OrderInvoiceFormValues) => {
    submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        onSubmit && onSubmit(response.data);
        handleClose();
      },
    });
  };

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };
  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon="fa6-solid:file-invoice-dollar" width={22} sx={{ opacity: 0.86 }} />
        </Label>
        Datos Fiscales de la Factura
      </DialogTitle>
      <form autoComplete="off" onSubmit={handleSubmit(sendForm)}>
        <DialogContent>
          <Stack display="flex" py={0}>
            <Box display="grid" textAlign="center" gap={1} mb={3}>
              <Typography variant="subtitle1" color="text.secondary">
                Total:
              </Typography>
              <Typography variant="subtitle1" noWrap color="secondary">
                {total}
              </Typography>
            </Box>
            <Box width={1} display="flex" flexDirection="column" gap={0}>
              <Typography variant="subtitle1">Nombre o Razón social:</Typography>
              <TextField
                size='small'
                defaultValue={clientName}
                sx={{ mb: 2, ...styleInput }}
                margin="dense"
                fullWidth
                {...register('client_name', { required: 'Debe ingresar la cedula del paciente' })}
                error={!!errors?.client_name}
                helperText={errors.client_name?.message}
              />
            </Box>
            <Box width={1} display="flex" flexDirection="column" gap={0}>
              <Typography variant="subtitle1">Cédula o Rif:</Typography>
              <TextField
                size='small'
                defaultValue={cedulaOrRif}
                sx={{ mb: 2, ...styleInput }}
                margin="dense"
                fullWidth
                {...register('ci_or_rif', { required: 'Debe ingresar la cedula del paciente' })}
                error={!!errors?.ci_or_rif}
                helperText={errors.ci_or_rif?.message}
              />
            </Box>
            <Box width={1} display="flex" flexDirection="column" gap={0}>
              <Typography variant="subtitle1">Telefono:</Typography>
              <TextField
                defaultValue={phone_number}
                sx={{ mb: 2, ...styleInput }}
                margin="dense"
                fullWidth
                {...register('phone_number')}
                error={!!errors?.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Box>
            <Box width={1} display="flex" flexDirection="column" gap={0}>
              <Typography variant="subtitle1">Domicilio:</Typography>
              <TextField
                size='small'
                defaultValue={address}
                sx={{ mb: 2, ...styleInput }}
                margin="dense"
                fullWidth
                {...register('address')}
                error={!!errors?.address}
                helperText={errors.address?.message}
              />
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <TextField
              margin="dense"
              multiline
              maxRows={2}
              fullWidth
              label="Comentario"
              {...register('comment', {
                maxLength: {
                  value: 250,
                  message: 'El comentario no debe superar los 250 caracteres',
                },
              })}
              error={!!errors?.comment}
              helperText={errors.comment?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', p: 2, justifyContent: 'center', gap: 4 }}>
          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            startIcon={<Iconify icon="heroicons:arrow-path-16-solid" />}
          >
            Generar
          </LoadingButton>
          <Button
            startIcon={<Iconify icon="mingcute:close-fill" width={17} />}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

export default GenerateInvoiceDialog;
