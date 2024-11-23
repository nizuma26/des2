//@Mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { newUser, editUser } from '../../../../api/security/user';

import { User } from '../../../../types/security/user';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../routes/hooks';

import { MuiDialog } from '../../../../components/dialog';
import Iconify from '../../../../components/iconify';
import { RouterLink } from '../../../../routes/components';
import Dropzone from '../../../../components/dropzone/dropzone';
import ControlledSwitch from '../../../../components/controlled/controlled-switch';
import AutocompleteRoles from './autocomplete-roles';
import AutocompleteLabs from './autocomplete-labs';
import CashRegisterSearch from './cash-register-search';

interface UserFormProps {
  values: User;
  invalidateQuery: () => void;
}

export default function UserForm({ values, invalidateQuery }: UserFormProps) {
  const form = useForm<User>({
    defaultValues: values,
  });

  const {
    register,
    formState: { errors },
    setValue,
    control,
    clearErrors,
    handleSubmit,
  } = form;

  const isEdit = values && values.id;

  const mutation = useMutation({
    mutationFn: isEdit ? editUser : newUser,
  });

  const router = useRouter();

  const mutate = useMutateData();

  const onSubmit = (data: User) => {
    mutate.submit({
      promise: mutation.mutateAsync({ ...data }),
      onSuccess: () => {
        invalidateQuery();
        router.push('/user');
      },
    });
  };

  const handleChangeRole = (id: number | null) => {
    setValue('groups', [Number(id)]);
    if (id !== null && !!errors.groups) clearErrors('groups');
  };

  const handleChangeLaboratory = (id: number | null) => {
    setValue('laboratory', id);
    if (id !== null && !!errors.laboratory) clearErrors('laboratory');
  };

  const handleChangeImage = (file: File | null) => {
    setValue('image', file);
  };

  const bannedAccountText = (
    <Typography component="h6" typography="body2" mb="4px">
      Desactivar Cuenta
    </Typography>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={7} lg={8}>
        <Card>
          <CardHeader title="Datos del usuario" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            noValidate
            autoComplete="off"
          >
            <CardContent sx={{ px: 3, pt: 4 }}>
              <Box
                sx={{
                  columnGap: 3,
                  rowGap: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                }}
              >
                <TextField
                  fullWidth
                  defaultValue={values?.names}
                  label="Nombres"
                  {...register('names', { required: 'Ingrese su primer y segundo nombre' })}
                  error={!!errors.names}
                  helperText={errors.names?.message}
                />
                <TextField
                  fullWidth
                  defaultValue={values?.last_names}
                  label="Apellidos"
                  {...register('last_names', { required: 'Ingrese su primer y segundo apellido' })}
                  error={!!errors.last_names}
                  helperText={errors.last_names?.message}
                />
                <TextField
                  fullWidth
                  defaultValue={values?.email}
                  label="Correo Electrónico"
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
                  defaultValue={values?.cedula}
                  label="Número de Cédula"
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
                  fullWidth
                  defaultValue={values?.username}
                  label="Nombre de Usuario"
                  {...register('username', { required: 'El nombre de usuario es requerido' })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  fullWidth
                  defaultValue={values?.password}
                  label="Contraseña"
                  type="password"
                  {...register('password', { required: 'La contraseña es requerida' })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <AutocompleteRoles
                  register={register}
                  errors={errors}
                  handleChangeRole={handleChangeRole}
                  defaultValue={Number(values?.groups)}
                />
                <AutocompleteLabs
                  register={register}
                  errors={errors}
                  handleChangeLaboratory={handleChangeLaboratory}
                  defaultValue={Number(values?.laboratory)}
                />
                <CashRegisterSearch control={control} userId={values?.id} />
              </Box>

              <TextField
                defaultValue={values && values?.address}
                fullWidth
                label="Dirección"
                multiline
                rows={2}
                sx={{ mt: 4 }}
                {...register('address')}
              />
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
                  href="/user"
                  component={RouterLink}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Cancelar
                </Button>
              </Stack>
            </CardContent>
          </form>
        </Card>
        <MuiDialog />
      </Grid>
      <Grid xs={12} md={5} lg={4}>
        <Card>
          <CardHeader title="Avatar" />
          <CardContent>
            <Dropzone onChange={handleChangeImage} defaultPreview={values?.image} />
            <Box display="flex" justifyContent="center">
              <ControlledSwitch
                name="is_active"
                label={bannedAccountText}
                labelPlacement="start"
                control={control}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
