//@mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { useDialogStore } from '../../../../../components/dialog';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { PatientFormValues } from '../../../../../types/orders/patients';
import { CreatePatientDialogProps } from './types';

import { editPatient, newPatient } from '../../../../../api/orders/patients';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import { GENDER_CHOICES } from '../../../patients/context';

import { SvgIcon } from '../../../../../components/svg-color';
import Label from '../../../../../components/label';
import ControlledDatePicker from '../../../../../components/controlled/controlled-datepicker';
import { PatientAge } from '../../../patients/components/form/patient-age';
import ControlledRadio from '../../../../../components/controlled/controlled-radio';
import AffiliationAutocomplete from '../../../patients/components/form/affiliation-autocomplete';

//-------------------------------------------------------------------

export default function CreatePatientDialog({
  values,
  invalidateQuery,
  onClose,
  onSubmit,
}: CreatePatientDialogProps) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const form = useForm<PatientFormValues>({
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

  const isEdit = !!values?.id;

  const handleClose = () => {
    closeDialog(), reset();
    onClose && onClose();
  };

  const mutation = useMutation({
    mutationFn: isEdit ? editPatient : newPatient,
  });

  const { submit } = useMutateData();

  const sendForm = (data: PatientFormValues) => {
    submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: (response) => {
        invalidateQuery();
        closeDialog();
        const action = isEdit ? "edit" : "add"
        onSubmit && onSubmit(response.data, action);
      },
      onError: (error) => {
        validateFieldErrors(values, error, setError);
      },
    });
  };

  const title = isEdit ? 'Modificar Paciente' : 'Crear Nuevo Paciente';
  const icon = isEdit ? <SvgIcon icon='ic_edit' /> : <SvgIcon icon='ic_add' />;

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          {icon}
        </Label>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit(sendForm)} noValidate autoComplete="off">
        <DialogContent>
          <Box display="grid" gap={3}>
            <Box
              sx={{
                columnGap: 3,
                rowGap: 3,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                },
              }}
            >
              <TextField
                defaultValue={values?.names}
                fullWidth
                label="Nombres"
                {...register('names', { required: 'Campo requerido' })}
                error={!!errors.names}
                helperText={errors.names?.message}
              />
              <TextField
                defaultValue={values?.last_names}
                fullWidth
                label="Apellidos"
                {...register('last_names', { required: 'Campo requerido' })}
                error={!!errors.last_names}
                helperText={errors.last_names?.message}
              />
              <TextField
                defaultValue={values?.cedula}
                fullWidth
                label="Cédula"
                {...register('cedula', { required: 'Campo requerido' })}
                error={!!errors.cedula}
                helperText={errors.cedula?.message}
              />
              <TextField
                defaultValue={values?.email}
                fullWidth
                label="Correo Electrónico"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <Stack direction={{ sm: 'column', md: 'row' }} gap={2}>
              <TextField
                defaultValue={values?.phone_number}
                fullWidth
                label="Número de Teléfono"
                {...register('phone_number')}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
              <ControlledDatePicker
                control={control}
                name="birthdate"
                label="Fecha de nacimiento"
              />
              <PatientAge control={control} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                defaultValue={values?.address}
                fullWidth
                label="Dirección"
                multiline
                rows={2}
                {...register('address')}
              />
              <FormControl>
                <ControlledRadio control={control} name="gender" options={GENDER_CHOICES} />
              </FormControl>
            </Stack>
            <Stack width={1}>
              <AffiliationAutocomplete control={control} isEdit={isEdit} />
            </Stack>
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
            Guardar
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose} startIcon={<SvgIcon icon='ic_close' />}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
