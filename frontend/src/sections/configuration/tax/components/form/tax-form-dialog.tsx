//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { TaxFormDialogProps } from './types';
import { Tax } from '../../../../../types/configuration/tax';

import { newTax, editTax } from '../../../../../api/configuration/tax';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useDialogStore } from '../../../../../components/dialog';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import { DEFAULT_FORM_VALUES, QUERY_KEYS, TYPE_TAX } from '../../context';

import { SvgIcon } from '../../../../../components/svg-color';
import Label from '../../../../../components/label';
import ControlledSelect from '../../../../../components/controlled/controlled-select';

//-------------------------------------------------------------------

export default function TaxFormDialog({
  values = DEFAULT_FORM_VALUES,
  onClose = () => {},
  onSubmit = () => {},
}: TaxFormDialogProps) {
  const form = useForm<Tax>({
    defaultValues: values,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = form;

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const isEdit = !!values?.id;

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editTax : newTax,
  });

  const mutate = useMutateData();

  const sendForm = (data: Tax) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        if (isEdit && data?.id !== undefined) {
          mutate.updateData({
            queryKey: [QUERY_KEYS.list],
            id: data.id,
            fields: ['name', 'tax', 'is_active'],
            values: [data.name, data.tax, data.is_active],
          });
        } else {
          mutate.append({ queryKey: [QUERY_KEYS.list], data: { ...response?.data } });
        }
        handleClose();
        onSubmit && onSubmit(response?.data);
      },
      onError: (error) => {
        validateFieldErrors(DEFAULT_FORM_VALUES, error, setError);
      },
    });
  };

  const icon = isEdit ? <SvgIcon icon='ic_edit' /> : <SvgIcon icon='ic_add' />;
  const title = isEdit ? 'Modificar' : 'Nuevo';

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          {icon}
        </Label>
        {title} impuesto
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
            <TextField
              defaultValue={values?.tax}
              label="Tasa"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              {...register('tax', {
                required: 'El impuesto es requerido',
                min: { value: 0, message: 'El impuesto no puede ser un número negativo' },
                max: { value: 100, message: 'El impuesto no puede ser mayor a 100%' },
              })}
              error={!!errors.tax}
              helperText={errors.tax?.message}
            />
            <ControlledSelect
              defaultValue={values.type_tax}
              control={control}
              name="type_tax"
              options={TYPE_TAX}
              label="Tipo de impuesto"
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
