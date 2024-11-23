import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';

import { RouterLink } from '../../routes/components';

import UnauthorizedSvg from '../../auth/components/unauthorized-svg';
import Logo from '../../components/logo/logo';

// ----------------------------------------------------------------------

export default function Error403() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo sx={{ alignItems: 'center' }} />
    </Box>
  );

  const renderError403 = (
    <Box
      sx={{
        width: 290,
        height: 290,
        display: 'inline-block',
      }}
    >
      <UnauthorizedSvg />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Acceso denegado
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            La página a la que intenta acceder tiene acceso restringido. Consulte con el administrador del sistema.
          </Typography>

          <Grow in={true}>
            <Box
              sx={{
                mx: 'auto',
                height: 260,
                my: { xs: 5, sm: 10 },
                color: 'primary.main',
              }}
            >
              {renderError403}
            </Box>
          </Grow>

          <Button href="/" size="large" variant="contained" color="inherit" component={RouterLink}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    </>
  );
};