import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

interface CustomChip {
  filterText: string;
  coincidences: number;
  cleanFilterText: () => void;
}

const CustomChip = ({ filterText, coincidences, cleanFilterText }: CustomChip) => (
  <Stack gap="12px" padding="0px 20px 20px">
    <Box fontSize="0.875rem">
      <strong>{coincidences}</strong>
      <Box component="span" color="text.secondary">
        Coincidencias
      </Box>
    </Box>
    <Stack sx={{ flexFlow: 'wrap', gap: '8px', flexGrow: 1, alignItems: 'center' }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '8px',
          borderRadius: '8px',
          backgroundImage: 'none',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box component="span">
          <Typography variant="subtitle2">Escrito:</Typography>{' '}
        </Box>
        <Stack sx={{ flexFlow: 'wrap', gap: '8px' }}>
          <ButtonBase
            component="div"
            sx={{
              borderRadius: '8px',
              backgroundColor: 'text.primary',
              color: 'background.paper',
            }}
          >
            <Chip label={filterText} onDelete={cleanFilterText} sx={{ height: '25px' }} />
          </ButtonBase>
        </Stack>
      </Paper>
      <Button variant="text" onClick={cleanFilterText} sx={{ color: 'danger.main' }}>
        <Iconify icon="solar:trash-bin-minimalistic-bold" sx={{ mr: 1 }} />
        Limpiar
      </Button>
    </Stack>
  </Stack>
);

export default CustomChip;
