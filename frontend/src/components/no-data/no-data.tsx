import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NoData({ query } : {query: string}) {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" paragraph>
        Sin resultados
      </Typography>

      <Typography variant="body2">
        No hay coincidencias para &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Intente comprobar si hay errores tipográficos o utilizar palabras completas.
      </Typography>
    </Box>
  );
}

NoData.propTypes = {
  query: PropTypes.string,
};
