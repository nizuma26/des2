import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UnauthorizedSvg from './unauthorized-svg';

const Unauthorized = () => (
  <Stack width={1} height={1}>
    <Typography variant="h5" component="h1" gutterBottom>
      Acceso denegado
    </Typography>
    <Typography variant="subtitle2">No tienes permiso para acceder a esta sección.</Typography>
    <UnauthorizedSvg />
  </Stack>
);

export default Unauthorized;
