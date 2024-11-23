import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ItemInfoProps } from './types';

// -------------------------------------------------

function ItemInfo({ label, value, width=1 }:ItemInfoProps) {
  return (
    <Stack direction="row" alignItems="center" width={width} px={1} spacing={0.5}>
      <Typography variant="subtitle2">{label}</Typography>
      <Box
        width={1}
        py='4px'
        px={1}
        bgcolor="background.neutral"
        height="auto"
        typography="subtitle2"
        borderRadius="4px"
        fontSize={12}
      >
      <Typography variant="subtitle2" noWrap>{value || '.'}</Typography>
      
      </Box>
    </Stack>
  );
}

export default ItemInfo;
