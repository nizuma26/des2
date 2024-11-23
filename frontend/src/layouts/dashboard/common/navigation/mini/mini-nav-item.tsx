import { ReactNode } from 'react';
//@mui
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha, useTheme } from '@mui/material/styles';

import { COLLAPSE_NAV_ITEMS } from '../../../config-layout';

import { NavItem } from '../types';

import { usePathname } from '../../../../../routes/hooks';
import { Typography } from '@mui/material';
import { useSettingsLayout } from '../../../../../store/settings';

interface MiniNavItemProps {
  items: NavItem[];
  icon: ReactNode;
  title: string;
  showDrawer: (items: NavItem[]) => void;
}

export default function MiniNavItem({ items, icon, title, showDrawer }: MiniNavItemProps) {

  const pathname = usePathname();

  const { palette: { primary, mode } } = useTheme();

  const navColor = useSettingsLayout.getState().navColor;
  
  const isActive = items?.some((path: NavItem) => path.path === pathname);

  const styleItem = {    
    bgcolor: alpha(primary.main, 0.08),
    '&:hover': {
      bgcolor: alpha(primary.main, 0.18),
    },
  };

  return (
    <>
      <ButtonBase
        onClick={() => showDrawer(items)}
        sx={{
          color: mode === 'light' && navColor === 'integrate' ? 'text.secondary' : 'text.disabled',
          ...COLLAPSE_NAV_ITEMS,          
          ...(isActive && { ...styleItem, color: mode === 'light' ? primary.main : primary.light }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 0 }}>
          {icon}
        </Box>
        <Typography variant='subtitle2' fontSize={12} component="span">
          {title}
        </Typography>
      </ButtonBase>
    </>
  );
}
