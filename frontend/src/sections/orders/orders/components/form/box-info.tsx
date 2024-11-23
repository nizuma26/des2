import Box from '@mui/material/Box';

import { BoxInfoProps } from '../types';

export const BoxInfo = ({ text, defaultText='Info' }: BoxInfoProps) => (
  <Box
    width={1}
    display="flex"
    bgcolor="background.neutral"
    p={2}
    borderRadius={1}
    color={!!text ? 'text.secondary' : 'text.disabled'}
    typography="subtitle2"
    gap={2}
  >
    <Box>{text || defaultText}</Box>
  </Box>
);
