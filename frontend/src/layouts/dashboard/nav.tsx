import { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { NavData } from './common/navigation/types';

import { usePathname } from '../../routes/hooks';
import { useResponsive } from '../../hooks/use-responsive';
import { useSettingsLayout } from '../../store/settings';

import { NAV } from './config-layout';

import { VerticalSection, MiniSection, HorizontalSection } from './common/navigation';

// ----------------------------------------------------------------------

interface NavProps {
  data: NavData[];
  openNav: boolean;
  onCloseNav: () => void;
  orientation: string;
  loading: boolean;
}

export default function Nav({ data, openNav, onCloseNav, orientation, loading }: NavProps) {

  const navColor = useSettingsLayout((state) => state.navColor);

  const { palette } = useTheme();

  const mode = palette.mode

  const bgcolor = navColor === 'integrate' 
  ? NAV.NAV_COLOR.integrate?.[mode]
  : NAV.NAV_COLOR.apparent?.[mode]

  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  const newWidth = orientation === 'vertical' ? NAV.WIDTH : NAV.WIDTH_COLLAPSE;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        ...(orientation !== 'horizontal' && {
          width: { lg: newWidth },
          transition: 'width 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }),
      }}
    >
      {upLg ? (
        (orientation === 'vertical' && <VerticalSection data={data} loading={loading} bgcolor={bgcolor} />) ||
        (orientation === 'collapse' && <MiniSection data={data} loading={loading} bgcolor={bgcolor} />) ||
        (orientation === 'horizontal' && <HorizontalSection data={data} loading={loading} bgcolor={bgcolor} />)
      ) : (
        <Drawer open={openNav} onClose={onCloseNav}>
          <VerticalSection data={data} bgcolor={bgcolor} loading={loading} />
        </Drawer>
      )}
    </Box>
  );
}
