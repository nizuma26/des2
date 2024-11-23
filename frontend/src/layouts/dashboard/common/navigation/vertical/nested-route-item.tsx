import { ReactNode, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useTheme } from '@mui/material/styles';

import { usePathname } from '../../../../../routes/hooks';

import { NavSubItem } from '../types';

import { NAV_ITEMS } from '../../../config-layout';

import Iconify from '../../../../../components/iconify';
import RouteItem from './route-item';
import { useSettingsLayout } from '../../../../../store/settings';

interface NestedNavItemProps {
  subitem: NavSubItem[];
  icon: ReactNode;
  title: string;
}

export default function NestedRouteItem({ icon, title, subitem }: NestedNavItemProps) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  
  const navColor = useSettingsLayout.getState().navColor;

  const {
    palette: { mode, primary },
  } = useTheme();

  const color = mode === 'light' ? primary.main : primary.light;

  const handleClick = () => {
    setOpen(!open);
  };

  const isActive = subitem.some((path: NavSubItem) => path.path === pathname);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const text = <Typography fontSize={14}>{title}</Typography>;

  const styleItem = {
    color: color,
    bgcolor: alpha(primary.main, 0.08),
    '&:hover': {
      bgcolor: alpha(primary.main, 0.18),
    },
  };
  const iconArrow = open ? 'rotate(90deg)' : 'rotate(0)';

  return (
    <>
      <ListItemButton
        sx={{
          color: 'text.secondary',
          mb: '4px',
          ...NAV_ITEMS,
          ...(isActive && { ...styleItem }),
        }}
        onClick={handleClick}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
          {icon}
        </Box>
        <ListItemText primary={text} />
        <Iconify icon="eva:arrow-ios-forward-fill" width={16} sx={{ transform: iconArrow }} />
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack spacing={0.6}>
          {subitem?.map((subItem) => (
            <RouteItem
              key={subItem.path}
              title={subItem.title}
              path={subItem.path}
            />
          ))}
        </Stack>
      </Collapse>
    </>
  );
}
