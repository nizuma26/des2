import { useState, MouseEvent, useEffect, ReactNode } from 'react';
//@mui
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import { alpha, useTheme } from '@mui/material/styles';

import { NavItem } from '../types';

import { usePathname } from '../../../../../routes/hooks/use-pathname';
import { useSettingsLayout } from '../../../../../store/settings';


import { HORIZONTAL_NAV_ITEMS } from '../../../config-layout';

import Iconify from '../../../../../components/iconify';
import PopoverItem from './popover-item';

interface HorizontalNavItemProps {
  icon: ReactNode;
  title: string;
  item: NavItem[];
}

export default function HorizontalNavItem({icon, title, item }: HorizontalNavItemProps) {

  const [active, setActive] = useState(false);

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const { palette: { primary, mode } } = useTheme();
  
  const navColor = useSettingsLayout.getState().navColor;

  const pathname = usePathname();
  
  const isActive = item.some((path:NavItem) => path.path === pathname);

  useEffect(() => {
    setActive(isActive);
  }, [isActive])

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const hover = Boolean(open);

  const styleItem = {
    color: 'primary.main',
    bgcolor: alpha(primary.main, 0.08),
    '&:hover': {
      bgcolor: alpha(primary.main, 0.18),
    },
  };

  return (
    <>
      <ListItemButton
        aria-owns={hover ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        sx={{
            color: mode === 'light' && navColor === 'integrate' ? 'text.secondary' : 'text.disabled',            
          ...HORIZONTAL_NAV_ITEMS,
          ...(active && { ...styleItem }),
        }}
      >
        <Box component="span" sx={{ width: 22, height: 22, mr: 1 }}>
          {icon}
        </Box>
        <ListItemText primary={title} primaryTypographyProps={{ fontSize: 14 }} />
        <Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ml: '6px'}} />
      </ListItemButton>
      <Menu
        id="mouse-over-popover"
        sx={{maxWidth: 250, padding: '4px', display: 'grid', gap: '4px', pointerEvents: 'none' }}
        open={hover}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
        {item?.map((subItem) => (
          <PopoverItem
            key={subItem.path}
            title={subItem.title}
            path={subItem.path ?? '/'}
            pathname={pathname}
            handleCloseMenu={handleCloseMenu}            
          />
        ))}
      </Menu>
    </>
  );
}
