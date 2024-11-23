//@Mui
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { newLaboratory, editLaboratory } from '../../../../api/configuration/laboratory';

import { Laboratory } from '../../../../types/configuration/laboratory';

import { useRouter } from '../../../../routes/hooks';
import { useMutateData } from '../../../../hooks/use-mutate-data';

import { validateFieldErrors } from '../../../../utils/validate-fiels-errors';

import Iconify from '../../../../components/iconify';
import { RouterLink } from '../../../../routes/components';
import Dropzone from '../../../../components/dropzone/dropzone';
import { ControlledSwitch } from '../../../../components/controlled';

interface LaboratoryFormProps {
  values: Laboratory;
  invalidateQuery: () => void;
}

export default function LaboratoryForm({ values, invalidateQuery }: LaboratoryFormProps) {
  const form = useForm<Laboratory>({
    defaultValues: values,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const isEdit = values && values.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editLaboratory : newLaboratory,
  });

  const router = useRouter();
  const mutate = useMutateData();

  const handleChangeImage = (file: File | null) => {
    setValue('logo', file);
  };

  const onSubmit = (data: Laboratory) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        router.replace('/laboratory');
      },
      onError: (error) => {
        validateFieldErrors(values, error, setError)
      }
    });
  };

  return (
    <Grid container spacing={3} mt={1}>
      <Grid xs={12} md={12} lg={8}>
        <Card sx={{ overflow: 'visible' }}>
          <CardHeader title="Datos generales" sx={{ mb: 2 }} />
          <Box
            component="form"
            sx={{
              px: 3,
              pt: 3,
            }}
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            noValidate
          >
            <Box
              sx={{
                mb: 4,
                columnGap: 3,
                rowGap: 4,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              <TextField
                defaultValue={values?.name}
                fullWidth
                multiline
                label="Nombre"
                {...register('name', { required: 'El nombre es requerido' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                defaultValue={values?.document}
                fullWidth
                label="RIF"
                {...register('document', { required: 'El documento es requerido' })}
                error={!!errors.document}
                helperText={errors.document?.message}
              />
              <TextField
                defaultValue={values?.email}
                fullWidth
                label="Correo Electrónico"
                type="email"
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    message: 'El correo electrónico no es valido',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                defaultValue={values?.local_phone}
                fullWidth
                label="Teléfono Local"
                type="number"
                {...register('local_phone', {
                  required: 'El teléfono local es requerido',
                  minLength: {
                    value: 11,
                    message: 'El teléfono debe tener como mínimo 11 dígitos',
                  },
                  maxLength: {
                    value: 11,
                    message: 'El teléfono debe tener como máximo 11 dígitos',
                  },
                })}
                error={!!errors.local_phone}
                helperText={errors.local_phone?.message}
              />
              <TextField
                defaultValue={values?.mobile_phone}
                fullWidth
                label="Teléfono Movil"
                type="number"
                {...register('mobile_phone', {
                  minLength: {
                    value: 11,
                    message: 'El teléfono debe tener como mínimo 11 dígitos',
                  },
                  maxLength: {
                    value: 11,
                    message: 'El teléfono debe tener como máximo 11 dígitos',
                  },
                })}
                error={!!errors.mobile_phone}
                helperText={errors.mobile_phone?.message}
              />
              <TextField
                defaultValue={values?.manager}
                fullWidth
                label="Representante"
                {...register('manager', { required: 'El representante es requerido' })}
                error={!!errors.manager}
                helperText={errors.manager?.message}
              />
              <TextField
                defaultValue={values?.cedula}
                fullWidth
                label="Cédula"
                type="number"
                {...register('cedula', {
                  required: 'La cédula es requerida',
                  minLength: { value: 8, message: 'La cédula debe tener como mínimo 8 digitos' },
                  maxLength: { value: 8, message: 'La cédula debe tener como máximo 8 digitos' },
                })}
                error={!!errors.cedula}
                helperText={errors.cedula?.message}
              />
              <TextField
                defaultValue={values?.address}
                fullWidth
                label="Dirección"
                multiline
                maxRows={3}
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField
                defaultValue={values?.description}
                fullWidth
                label="Descripción"
                multiline
                maxRows={3}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <FormGroup row>
                <ControlledSwitch name='is_active' label='Activo' control={control}  />
                <ControlledSwitch name='is_main' label='¿Es principal?' control={control}  />
              </FormGroup>
            </Box>
            <Stack
              direction="row"
              display="flex"
              justifyContent="flex-end"
              gap={1}
              paddingBottom={3}
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
                loading={mutation.isPending}
                type="submit"
              >
                Guardar
              </LoadingButton>
              <Button
                href="/laboratory"
                variant="outlined"
                color="primary"
                component={RouterLink}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
      <Grid xs={12} md={12} lg={4}>
        <Card sx={{ pb: 4, px: 1 }}>
          <CardHeader title="Logo" sx={{ mb: 5 }} />
          <Box>
            <Dropzone onChange={handleChangeImage} defaultPreview={values?.logo} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
