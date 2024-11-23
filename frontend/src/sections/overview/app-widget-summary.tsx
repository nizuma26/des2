import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fShortenNumber } from '../../utils/format-number';

// ----------------------------------------------------------------------

interface AppWidgetSummaryProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  loading: boolean;
  sx?: SxProps;
}

export default function AppWidgetSummary({
  label,
  value,
  icon,
  loading,
  sx,
  ...other
}: AppWidgetSummaryProps) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 2,
        py: 5,
        borderRadius: 2,
        boxShadow: 0,
        ...sx,
      }}
      {...other}
    >
      <Stack width="100%" alignItems="center" justifyContent="center">
        {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

        <Stack spacing={0.5} textAlign="center" justifyContent="center">
          {loading ? (
            <Box py={2}>
              <LinearProgress color="inherit" sx={{ opacity: 0.55 }} />
            </Box>
          ) : (
            <Typography variant="h4">{fShortenNumber(value)}</Typography>
          )}

          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            {label}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
