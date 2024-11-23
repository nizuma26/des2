import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useWatch } from 'react-hook-form';

import { ReceivedQuantityProps } from './types';

// ------------------------------------------------
export default function ReceivedQuantity({
  control,
  expectedQuantity,
  index,
}: ReceivedQuantityProps) {

  const receivedQuantity = useWatch({
    name: `detail.${index}.received_quantity`,
    control,
  })
  
  return (
    <Box>
      <Typography variant="subtitle2">
        {receivedQuantity || 0} / {expectedQuantity}
      </Typography>
    </Box>
  );
}
