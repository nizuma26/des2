import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ItemInfoProps } from './types';

// -------------------------------------------------

function ItemInfo({ label, value }:ItemInfoProps) {
  return (
    <Stack width={1} px={1} spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <Box
        p={1}
        bgcolor="background.neutral"
        height="auto"
        typography="subtitle2"
        borderRadius="4px"
        fontSize={12}
      >
        {value || '.'}
      </Box>
    </Stack>
  );
}

export default ItemInfo;
