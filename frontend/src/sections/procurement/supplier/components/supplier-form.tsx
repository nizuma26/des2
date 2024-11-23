//@Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormGroup from '@mui/material/FormGroup';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { newSupplier, editSupplier } from '../../../../api/procurement/supplier';

import { Supplier } from '../../../../types/procurements/supplier';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../routes/hooks';
import { validateFieldErrors } from '../../../../utils/validate-fiels-errors';

import Iconify from '../../../../components/iconify';
import { ControlledSwitch } from '../../../../components/controlled';
import { RouterLink } from '../../../../routes/components';

interface SupplierFormProps {
  values: Supplier;
  invalidateQuery: () => void;
}

export default function SupplierForm({ values, invalidateQuery }: SupplierFormProps) {
  const form = useForm<Supplier>({
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

  const isEdit = !!values?.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editSupplier : newSupplier,
  });

  const onSubmit = (data: Supplier) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        router.push('/supplier');
      },
      onError: (error) => {
        validateFieldErrors(values, error, setError)
      }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12} lg={12}>
        <Card sx={{ overflow: 'visible' }}>
          <Box
            component="form"
            display="grid"
            py={4}
            px={3}
            gap={4}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <Box sx={{
                columnGap: 3,
                rowGap: 4,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
            
              }}>
                <TextField
                  fullWidth
                  defaultValue={values?.trade_name}
                  label="Nombre Comercial"
                  {...register('trade_name', { required: 'Debe ingresar un nombre comercial' })}
                  error={!!errors.trade_name}
                  helperText={errors.trade_name?.message}
                />
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  defaultValue={values?.legal_name}
                  label="Razón social"
                  {...register('legal_name', { required: 'Debe ingresar una razón social' })}
                  error={!!errors.legal_name}
                  helperText={errors.legal_name?.message}
                />
                <TextField
                  fullWidth
                  defaultValue={values?.rif}
                  label="RIF"
                  {...register('rif', { required: 'Debe ingresar el RIF' })}
                  error={!!errors.rif}
                  helperText={errors.rif?.message}
                />

              <TextField
                fullWidth
                defaultValue={values?.email}
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
              <TextField
                fullWidth
                defaultValue={values?.phone_number}
                label="Número de Teléfono"
                type="number"
                {...register('phone_number', {
                  minLength: {
                    value: 11,
                    message: 'El teléfono debe tener como mínimo 11 dígitos',
                  },
                  maxLength: {
                    value: 11,
                    message: 'El teléfono debe tener como máximo 11 dígitos',
                  },
                })}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
              <TextField
                fullWidth
                defaultValue={values?.contact_person}
                label="Persona de contacto"
                {...register('contact_person')}
              />
              <TextField
                fullWidth
                defaultValue={values?.credit_limit}
                label="Límite de crédito"
                type="number"
                {...register('credit_limit')}
              />
              <TextField
                fullWidth
                defaultValue={values?.credit_days}
                label="Días de crédito"
                type="number"
                {...register('credit_days')}
              />
              <TextField
                defaultValue={values?.postal_code}
                label="Código postal"
                type="number"
                {...register('postal_code')}
                error={!!errors.postal_code}
                helperText={errors.postal_code?.message}
              />
            </Box>
            <Box
              sx={{
                columnGap: 3,
                rowGap:4,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              }}
            >
              <TextField
                defaultValue={values?.address}
                fullWidth
                label="Dirección"
                multiline
                rows={3}
                {...register('address')}
              />
              <TextField
                defaultValue={values?.description}
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                {...register('description')}
              />
            </Box>
            <FormGroup sx={{ width: 100 }}>
              <ControlledSwitch name="is_active" label="Activo" control={control} />
            </FormGroup>
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
                loading={mutation.isPending}
                type="submit"
              >
                Guardar
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                loading={mutation.isPending}
                type="submit"
              >
                Guardar y crear otro
              </LoadingButton>
              <Button
                variant="outlined"
                color="primary"
                href="/supplier"
                component={RouterLink}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
