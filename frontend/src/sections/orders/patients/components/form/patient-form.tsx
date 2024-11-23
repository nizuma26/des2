//@Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { PatientFormValues } from '../../../../../types/orders/patients';
import { PatientFormProps } from '../types';

import { newPatient, editPatient } from '../../../../../api/orders/patients';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../../routes/hooks';

import { validateFieldErrors } from '../../../../../utils/validate-fiels-errors';

import Iconify from '../../../../../components/iconify';
import AffiliationAutocomplete from './affiliation-autocomplete';
import ControlledDatePicker from '../../../../../components/controlled/controlled-datepicker';
import ControlledRadio from '../../../../../components/controlled/controlled-radio';
import { PatientAge } from './patient-age';
import { GENDER_CHOICES } from '../../context';

export default function PatientForm({ values, invalidateQuery }: PatientFormProps) {
  const form = useForm<PatientFormValues>({
    defaultValues: values,
  });

  const router = useRouter();
  const mutate = useMutateData();

  const {
    register,
    formState: { errors },
    control,
    setError,
    handleSubmit,
  } = form;

  const returnToListPage = () => router.replace('/patient');

  const isEdit = !!values?.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editPatient : newPatient,
  });

  const onSubmit = (data: PatientFormValues) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        returnToListPage();
      },
      onError: (error) => {
        validateFieldErrors(values, error, setError);
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Card sx={{ overflow: 'visible' }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Box display="grid" py={4} px={3} gap={4}>
              <Box
                sx={{
                  columnGap: 3,
                  rowGap: 4,
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
                  {...register('email', {
                    pattern: {
                      value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                      message: 'El correo electrónico no es valido',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>
              <Stack direction={{ sm: 'column', md: 'row' }} gap={3}>
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
                <TextField defaultValue={values?.address} fullWidth label="Dirección" multiline rows={2} {...register('address')} />
                <FormControl>
                  <ControlledRadio control={control} name="gender" options={GENDER_CHOICES} />
                </FormControl>
              </Stack>
              <Stack width={1}>
                <AffiliationAutocomplete control={control} isEdit={isEdit} />
              </Stack>
              <Stack
                direction="row"
                display="flex"
                justifyContent="flex-end"
                gap={1}
                mt={5}
                sx={{
                  '@media (max-width: 547px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <LoadingButton
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  loading={false}
                  type="submit"
                >
                  Guardar
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  loading={false}
                  type="submit"
                >
                  Guardar y crear otro
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={returnToListPage}
                >
                  Cancelar
                </Button>
              </Stack>
            </Box>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
