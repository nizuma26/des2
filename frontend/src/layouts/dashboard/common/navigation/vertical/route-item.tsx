import { ReactNode } from 'react';
//@mui
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { useTheme } from '@mui/material/styles';
import { usePathname } from '../../../../../routes/hooks';
import { NAV_ITEMS } from '../../../config-layout';

import { RouterLink } from '../../../../../routes/components';
import { useSettingsLayout } from '../../../../../store/settings';

interface SimpleVerticalItem {
  title: string;
  icon?: ReactNode;
  path?: string;
}

export default function RouteItem({ title, icon, path }: SimpleVerticalItem) {
  const pathname = usePathname();

  const navColor = useSettingsLayout.getState().navColor;

  const {
    palette: { mode, primary },
  } = useTheme();

  const isActive = path === pathname;

  const color = mode === 'light' && navColor === 'integrate' ? primary.main : primary.light;

  const circle = (
    <Box
      component="span"
      width={24}
      height={24}
      flexShrink={0}
      mr="16px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        component="span"
        sx={{
          borderRadius: '50%',
          height: 4,
          width: 4,
          transition: 'transform 190ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          ...(isActive ? { bgcolor: color, transform: 'scale(2)' } : { bgcolor: 'text.secondary' }),
        }}
      />
    </Box>
  );
  const href = String(path);

  return (
    <ListItemButton
      component={RouterLink}
      href={href}
      sx={{
        color: 'text.secondary',
        ...NAV_ITEMS,
        ...(isActive && {
          color: color,
          bgcolor: alpha(primary.main, 0.08),
          '&:hover': {
            bgcolor: alpha(primary.main, 0.18),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}>
        {icon ? icon : circle}
      </Box>
      <Box sx={{ fontSize: 14, textAlign: 'left' }} component="span">
        {title}
      </Box>
    </ListItemButton>
  );
}
