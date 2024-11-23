import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { bgGradient2 } from '../../../../theme/css';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { BaseModalProps } from '../../../../types';
import { AccountPayablePaymentFormValues } from '../../../../types/procurements/account-payable';

import { QUERY_KEYS } from '../context';

import { newPayment } from '../../../../api/procurement/account-payable-payment';

import { validateFieldErrors } from '../../../../utils/validate-fiels-errors';

import BankSearch from '../../../common/autocompletes/bank-search';
import PaymentMethodToggleButtons from './payment-method-toggle-buttons';
import { SvgIcon } from '../../../../components/svg-color';
import ToastUtilities from '../../../../components/toast';

interface PaymentModalFormProps extends BaseModalProps {
  balance: number;
  account?: { id: number | null; label: string };
}

export default function PaymentDialogForm({
  balance,
  account,
  onClose = () => {},
  onSubmit = () => {},
}: PaymentModalFormProps) {
  const [open, setOpen] = useState(false);

  const {
    palette: { primary },
  } = useTheme();

  const defaultValue: AccountPayablePaymentFormValues = {
    account_payable: account?.id ?? null,
    payment_method: '',
    comment: '',
    payment_amount: balance,
    payment_ref: '',
    bank: null,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
    reset,
  } = useForm<AccountPayablePaymentFormValues>({
    defaultValues: defaultValue,
  });

  
  useEffect(() => {
    setValue('payment_amount', balance);
    setValue('account_payable', account?.id ?? null);
  }, [open]);
  
  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
    reset();
  };

  const handleOpen = () => {
    if (!!account?.id === false)
      return ToastUtilities.info({ msg: 'Debe seleccionar una cuenta para agregar un abono' });
    else if (balance == 0)
      return ToastUtilities.info({ msg: 'No se pueden registrar mas abonos porque la cuenta ya esta pagada' });

    setOpen(true);
  };

  const mutation = useMutation({
    mutationFn: newPayment,
  });

  const { submit, invalidateQueries } = useMutateData();

  const sendForm = (data: AccountPayablePaymentFormValues) => {
    submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQueries({ queryKey: [QUERY_KEYS.ACCOUNT_PAYABLE] });
        invalidateQueries({ queryKey: [QUERY_KEYS.DEBT_SUPPLIERS] });
        invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT, data.account_payable] });
        onSubmit(data);
        handleClose();
      },
      onError: (error) => {
        validateFieldErrors(defaultValue, error, setError);
      },
    });
  };

  const bgGradientPrimary = bgGradient2({
    direction: '135deg',
    startColor: primary.dark,
    endColor: primary.main,
  });

  const styleInput = {
    '& .MuiInputBase-input': {
      p: '12px',
    },
  };

  return (
    <>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<SvgIcon icon="ic_payment" />}
        onClick={handleOpen}
      >
        Registrar Abono
      </Button>
      {open && (
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          maxWidth="sm"
        >
          <AppBar
            sx={{
              position: 'relative',
              boxShadow: 'inherit',
              color: '#fff',
              ...bgGradientPrimary,
            }}
          >
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <SvgIcon icon="ic_close" />
              </IconButton>
              <Typography ml={2} variant="subtitle1" component="div">
                Nuevo Registro de Pago:
              </Typography>
              <Typography variant="subtitle1" ml={2}>
                #{account?.label}
              </Typography>
            </Toolbar>
          </AppBar>
          <form onSubmit={handleSubmit(sendForm)} autoComplete="off" className="scrollbar">
            <DialogContent>
              <Box display="grid" gap={3}>
                <Box display="grid" textAlign="center" gap={1}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Saldo
                  </Typography>
                  <Typography variant="subtitle1" noWrap color="primary">
                    {balance.toFixed(2)}
                  </Typography>
                </Box>
                <PaymentMethodToggleButtons name="payment_method" control={control} />
                <Box display="flex" flexDirection={{ sm: 'column', md: 'row' }} gap={2}>
                  <TextField
                    size="small"
                    defaultValue={balance}
                    fullWidth
                    label="Monto"
                    sx={{ ...styleInput }}
                    {...register('payment_amount', {
                      required: 'Debe ingresar un monto',
                      min: {
                        value: 1,
                        message: 'El monto debe ser mayor a 0',
                      },
                      max: {
                        value: Number(balance),
                        message: 'El monto no puede ser mayor al saldo deudor',
                      },
                      pattern: {
                        value: /^-?\d+\.?\d*$/,
                        message: 'Solo se permiten números enteros y decimales',
                      },
                    })}
                    error={!!errors.payment_amount}
                    helperText={errors.payment_amount?.message}
                  />
                </Box>
                <Box display="flex" flexDirection={{ sm: 'column', md: 'row' }} gap={2}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Referencia #"
                    {...register('payment_ref')}
                    sx={{ ...styleInput }}
                  />
                  <BankSearch size="small" name="bank" control={control} buttonCreate={false} />
                </Box>
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  label="Comentario"
                  {...register('comment')}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={mutation.isPending}
                color="inherit"
                startIcon={<SvgIcon icon="ic_save" />}
              >
                Guardar
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}
