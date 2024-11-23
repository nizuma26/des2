//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { NavItem, NavSectionProps } from '../types';

import { usePathname } from '../../../../../routes/hooks';

import { NAV } from '../../../config-layout';

import Scrollbar from '../../../../../components/scrollbar';
import VerticalNavItem from './vertical-nav-item';
import VerticalNavSkeleton from './vertical-nav-skeleton';
import Logo from '../../../../../components/logo/logo';

const VerticalSection = ({ data, loading, bgcolor }: NavSectionProps) => {
  const pathname = usePathname();

  const checkIsActive = (items: NavItem[]) => items.some((item: NavItem) => item.path === pathname);

  return (
    <Box
      sx={{
        width: NAV.WIDTH,
        height: 1,
        position: 'fixed',
        borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        bgcolor: bgcolor,
      }}
    >
      <Logo sx={{ ml: 1, mt: 2 }} titleSx={{ mt: 1 }} />
      <Scrollbar>
        <Stack component="nav" sx={{ px: '10px', mt: 2 }}>
          {loading ? (
            <VerticalNavSkeleton />
          ) : (
            <Box
              component="ul"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                m: 0,
                px: 1,
                listStyle: 'none',
                pt: 2,
                pb: 9,
              }}
            >
              {data?.map((item) => (
                <Box component="li" key={item.title}>
                  <VerticalNavItem
                    subheader={item.title}
                    modules={item.children}
                    isActive={checkIsActive(item.children)}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </Scrollbar>
    </Box>
  );
};

export default VerticalSection;
