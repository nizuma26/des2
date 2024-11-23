import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

interface InfoCardProps {
  icon: string;
  title: string;
  body: string;
  progressCircular: number;
  cant: string;
  sx?: object;
}

const InfoCard = ({ icon, title, body, cant, progressCircular, sx }: InfoCardProps) => (
  
  <Stack
    position="relative"
    flexDirection="row"
    gap="39px"
    alignItems="center"
    justifyContent="center"
    width="100%"
    minWidth="200px"
  >
    <Stack position="relative" alignItems="center" justifyContent="center">
      <Iconify
        icon={icon}
        sx={{ height: 32, width: 32, position: 'absolute', ...sx }}
      />
      <CircularProgress
        variant="determinate"
        size={56}
        thickness={2}
        value={progressCircular}
        sx={{ position: 'absolute', mt: 0, ml: 0, opacity: 0.48, ...sx }}
      />
    </Stack>
    <Stack gap="4px">
      <Typography component="h6" variant="subtitle1">
        {title}
      </Typography>
      <Box component="span" fontSize="0.875rem" color="text.disabled">
        {body}
      </Box>
      <Typography component="h6" variant="subtitle2">
        {cant}
      </Typography>
    </Stack>
  </Stack>
);

export default InfoCard;
