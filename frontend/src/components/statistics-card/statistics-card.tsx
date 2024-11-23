import { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Scrollbar from '../scrollbar';

function StatisticsCard({ children } : {children: ReactNode}) {
  return (
    <Paper
      sx={{
        position: 'relative',
        borderRadius: '16px',
        zIndex: 0,
        overflow: 'hidden',
        mb: 5,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <Scrollbar>
        <Stack flexDirection="row" py="16px">
          {children}
        </Stack>
      </Scrollbar>
    </Paper>
  );
}

export default StatisticsCard;
