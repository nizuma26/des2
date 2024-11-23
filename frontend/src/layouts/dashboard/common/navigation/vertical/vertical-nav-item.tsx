import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { NavItem } from '../types';

import { useSettingsLayout } from '../../../../../store/settings';

import Iconify from '../../../../../components/iconify/iconify';
import NestedRouteItem from './nested-route-item';
import RouteItem from './route-item';

interface NavItemVerticalProps {
  subheader: string;
  modules: NavItem[];
  isActive: boolean;
}

const VerticalNavItem = ({ subheader, modules, isActive }: NavItemVerticalProps) => {
  
  const [open, setOpen] = useState(true);

  const handleCollapseItem = () => {
    setOpen(!open);
  };

  const {
    palette: { mode },
  } = useTheme();

  const navColor = useSettingsLayout.getState().navColor;


  const styleSubheader = {
    width: 1,
    typography: 'caption',
    fontSize: '0.6875rem',
    py: '4px',
    px: '3px',
    fontWeight: 'fontWeightBold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: 'text.disabled',
    borderRadius: '3px',
    '&:hover': { color: mode === 'light' && navColor === 'integrate' ? 'text.primary' : '#fff', },
    transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  };

  const iconArrow = open ? 'rotate(90deg)' : 'rotate(0)';

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        width={1}
        mb={1}
        sx={{
          transition: 'margin 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Iconify
          icon="icon-park-outline:right"
          width={15}
          sx={{ transform: iconArrow, color: 'primary.main' }}
        />
        <ListSubheader
          component="div"
          sx={{ ...styleSubheader }}
          onClick={handleCollapseItem}
          disableSticky
        >
          {subheader}
        </ListSubheader>
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          component="ul"
          sx={{ display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', p: 0 }}
        >
          {modules?.map((module) => (
            <Box component="li" key={module.key}>
              {module.children ? (
                <NestedRouteItem
                  icon={module.icon}
                  title={module.title}
                  subitem={module.children}
                />
              ) : (
                <RouteItem title={module.title} icon={module.icon} path={module?.path} />
              )}
            </Box>
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default VerticalNavItem;
