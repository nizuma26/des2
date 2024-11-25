import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { Toaster } from 'sonner';

import { jwtDecode } from 'jwt-decode';

import { TokenDecode } from '../../types';

import { useUserPermissions } from '../../auth/hooks/use-user-permissions';
import { useSettingsLayout } from '../../store/settings';
import { useAuthPrivate } from '../../auth/hooks/use-auth-private';

import { navConfig } from './config-navigation';

import Nav from './nav';
import Main from './main';
import Header from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openNav, setOpenNav] = useState(false);

  const setNavConfig = useSettingsLayout((state) => state.setNavConfig);

  const orientationStore = useSettingsLayout((state) => state.orientationStore);

  const navColor = useSettingsLayout((state) => state.navColor);

  const {
    palette: { background, text },
  } = useTheme();

  const { data: permissionsData = [], isPending } = useUserPermissions();
  const permissionsSet = new Set(permissionsData?.views);

  const token = useAuthPrivate((state) => state.access);

  const tokenDecode: TokenDecode = jwtDecode(token);

  const filterNavData = useMemo(() => {
    return tokenDecode?.is_superuser
      ? navConfig
      : navConfig
          .map(({ children, ...section }) => ({
            ...section,
            children: children.filter(
              ({ permissions }) =>
                !permissions?.length ||
                permissions.some((permission) => permissionsSet.has(permission))
            ),
          }))
          .filter((section) => section.children.length > 0);
  }, [navConfig, permissionsSet]);

  const handleOpenNav = () => {
    setOpenNav(true);
    setNavConfig('vertical');
  };

  const collapse = orientationStore === 'collapse' ? 'vertical' : 'collapse';

  return (
    <>
      <Header
        onOpenNav={() => handleOpenNav()}
        onCollapse={() => setNavConfig(collapse)}
        orientation={orientationStore}
        navColor={navColor}
        navData={filterNavData}
        loading={isPending}
      />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          orientation={orientationStore}
          data={filterNavData}
          loading={isPending}
        />

        <Main orientation={orientationStore}>{children}</Main>
        <Toaster
          expand={false}
          toastOptions={{
            style: {
              background: background.paper,
              border: 'none',
              color: text.secondary,
              padding: '6px',
            },
          }}
        />
      </Box>
    </>
  );
}
