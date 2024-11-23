import Box from '@mui/material/Box';

import { useResponsive } from '../../hooks/use-responsive';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

interface MainProps {
  children: React.ReactNode;
  orientation: string;
  sx?: object;
}

export default function Main({ children, orientation, sx, ...other }: MainProps) {
  const SPACING = 8;

  const lgUp = useResponsive('up', 'lg');

  const height = orientation !== 'horizontal' ? HEADER.H_DESKTOP : NAV.HEIGHT_HORIZONTAL;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${height + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
