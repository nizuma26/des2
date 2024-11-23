import { useState } from 'react';

import './login.css';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { Toaster } from 'sonner';

import { loginRequest } from '../../api/auth';

import { useRouter } from '../../routes/hooks';
import { useAuthPrivate } from '../../auth/hooks/use-auth-private';

import { bgGradient } from '../../theme/css';

import LogoCompany from '../../components/logo/logo-company';
import Iconify from '../../components/iconify';
import ToastUtilities from '../../components/toast';
import { getValidationError } from '../../utils/get-validation-error';

// ----------------------------------------------------------------------

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginView() {
  const {
    palette: { primary, background, text },
  } = useTheme();
  const router = useRouter();

  const setToken = useAuthPrivate((state) => state.setToken);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LoginForm>();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ data }) => {
      setToken(data.access, data.refresh);
      router.push('/');
    },
    onError: (error: any) => {
      ToastUtilities.error({
        msg:
          error.response.status === 401
            ? 'No se encontró ninguna cuenta activa con las credenciales proporcionadas'
            : getValidationError(error.code),
      }),
        reset();
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    loginMutation.mutate({
      ...data,
    });
  };

  const renderForm = (
    <>
      <Stack flexDirection="row" justifyContent="center">
        <LogoCompany
          sx={{
            position: 'absolute',
            top: { xs: 16, md: 24 },
            alignItems: 'center'
          }}
        />
      </Stack>
      <form id="auth_form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h4"
          typography="subtitle2"
          color="text.secondary"
          textAlign="center"
          mb={4}
        >
          Hola, bienvenido de vuelta 👋
        </Typography>
        <Typography
          variant="h4"
          mb={4}
          typography="subtitle2"
          color="text.secondary"
          textAlign="center"
        >
          Inicie Sesión
        </Typography>
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="Nombre de Usuario"
            {...register('username', {
              required: 'El nombre de usuario es requerido',
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', {
              required: 'La contraseña es requerida',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            ¿Haz olvidado tu contraseña?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loginMutation.isPending}
          color="inherit"
        >
          Iniciar Sesión
        </LoadingButton>
      </form>
    </>
  );

  return (
    <Box
      id="login_content"
      className="fade_down_animation"
      sx={{
        minHeight: 1,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Grid container minWidth={1}>
          <Grid xs={0} md={7} lg={7}>
            <Box
              sx={{
                display: 'flex',
                height: 1,
                flex: '1 1 auto',
                borderBottomRightRadius: '5px',
                borderTopRightRadius: '5px',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                ...bgGradient({
                  startColor: alpha(primary.main, 0.6),
                  endColor: alpha(primary.dark, 0.9),
                  direction: '520deg',
                  imgUrl: '/assets/images/covers/cover_19.jpg',
                }),
              }}
            />
          </Grid>
          <Grid xs={12} md={5} lg={5}>
            <Box
              sx={{
                ...bgGradient({
                  color: alpha(background.default, 0.9),
                  imgUrl: '/assets/background/overlay_4.jpg',
                }),
                display: 'flex',
                height: 1,
                width: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                bgcolor: 'background.default',
              }}
            >
              {renderForm}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Toaster
        expand={false}
        toastOptions={{
          style: {
            background: background.paper,
            border: 'none',
            color: text.secondary,
            padding: '8px',
          },
        }}
      />
    </Box>
  );
}
