import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';

import { NavColor } from '../../store/types';

import Iconify from '../../components/iconify';
import Logo from '../../components/logo/logo';

import Settings from './common/setting-layout/settings';
import SearchNavItems from './common/search-nav-items';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenNav: () => void;
  onCollapse: () => void;
  orientation: string;
  navColor: NavColor;
}

export default function Header({ onOpenNav, onCollapse, orientation, navColor }: HeaderProps) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const newWidth =
    (orientation === 'vertical' && NAV.WIDTH) ||
    (orientation === 'collapse' && NAV.WIDTH_COLLAPSE) ||
    (orientation === 'horizontal' && 0);

  const mode = theme.palette.mode;

  const bgcolor = navColor === 'apparent' &&  orientation === 'horizontal'
  ? NAV.NAV_COLOR.apparent?.[mode] 
  : NAV.NAV_COLOR.integrate?.[mode];

  const renderContent = (
    <>
      {orientation === 'horizontal' && <Logo sx={{ mr: 3, alignItems: 'center' }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="heroicons-solid:menu-alt-3" />
        </IconButton>
      )}

      {orientation !== 'horizontal' && lgUp && (
        <IconButton onClick={onCollapse} sx={{ mr: 1 }}>
          <Iconify icon="heroicons-solid:menu-alt-3" />
        </IconButton>
      )}

      <SearchNavItems />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <NotificationsPopover />
        <Settings />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_DESKTOP_OFFSET,
        zIndex: theme.zIndex.appBar + 1,
        background: bgcolor,
        ...(orientation !== 'horizontal' && {
          ...bgBlur({
            color: bgcolor,
          }),
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.leavingScreen,
          }),
        }),

        ...(lgUp && {
          width: `calc(100% - ${newWidth}px)`,
          height: HEADER.H_DESKTOP_OFFSET,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          width: '100%',
          px: { lg: 3 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
