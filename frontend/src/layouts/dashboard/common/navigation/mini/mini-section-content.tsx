import { useEffect, useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

import { NavData, NavItem } from '../types';

import { usePathname } from '../../../../../routes/hooks';

import Scrollbar from '../../../../../components/scrollbar';
import NestedRouteItem from '../vertical/nested-route-item';
import RouteItem from '../vertical/route-item';
import MiniNavItem from './mini-nav-item';

interface MiniSectionContentProps {
  data: NavData[];
  bgcolor:string;
}

export default function MiniSectionContent({ data, bgcolor }: MiniSectionContentProps) {
  
  const [items, setItems] = useState<NavItem[] | null>(null);

  const pathname = usePathname();

  const showDrawer = (getItems: NavItem[]) => setItems(getItems);

  const closeDrawer = () => setItems(null);

  useEffect(() => {
    setItems(null);
  }, [pathname]);

  const open = items !== null && items?.length > 0;

  return (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >      

      <Stack spacing={0.9} component="nav" sx={{ px: 1, py: 2 }}>
        {data?.map((item) => {
          return (
            <MiniNavItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              items={item?.children}
              showDrawer={showDrawer}
            />
          );
        })}
      </Stack>
      <Drawer
        open={open}
        anchor="left"
        onClose={closeDrawer}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: bgcolor,
            left: '120px', // Ancho del Drawer
            py: 1,
            px: 1,
          },
        }}
        slotProps={{ backdrop: { invisible: false } }}
      >
        <Box
          component="ul"
          sx={{ display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', p: 0 }}
        >
          {items?.map((module) => (
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
      </Drawer>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
};
