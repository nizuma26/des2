//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { NavSectionProps } from '../types';

import { HEADER } from '../../../config-layout';
import { useResponsive } from '../../../../../hooks/use-responsive';
import { bgBlur } from '../../../../../theme/css';

import HorizontalNavSkeleton from './horizontal-nav-skeleton';
import Scrollbar from '../../../../../components/scrollbar';
import HorizontalNavItem from './horizontal-nav-item';

const HorizontalSection = ({ data, loading = false, bgcolor }: NavSectionProps) => {
  const lgUp = useResponsive('up', 'lg', 'md');
  const theme = useTheme();
  // const toolbarStyles = {
  //   boxShadow: 'none',
  //   height: HEADER.H_DESKTOP_OFFSET,
  //   zIndex: theme.zIndex.appBar + 1,
  //   width: '100%',
  //   top: '64px',
  //   background: bgcolor,
  //   borderTop: `dashed 1px ${theme.palette.divider}`,
  //   ...bgBlur({
  //     color: bgcolor,
  //     opacity: 0.96,
  //   }),
  //   transition: theme.transitions.create(['height'], {
  //     duration: theme.transitions.duration.shorter,
  //   }),
  //   ...(lgUp && {
  //     height: HEADER.H_DESKTOP_OFFSET,
  //   }),
  // };
  return (
    <AppBar
      component="div"
      sx={(theme) => ({
        boxShadow: 'none',
        height: HEADER.H_DESKTOP_OFFSET,
        zIndex: theme.zIndex.appBar + 1,
        width: '100%',
        top: '64px',
        background: bgcolor,
        borderTop: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({
          color: bgcolor,
          opacity: 0.96,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          height: HEADER.H_DESKTOP_OFFSET,
        }),
      })}
    >
      <Toolbar
        sx={{
          height: 1,
          width: '100%',
          px: { lg: 3 },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            },
          }}
        >
          <Stack
            component="nav"
            direction="row"
            spacing={2}
            mr="auto"
            ml="auto"
            alignItems="center"
            height="100%"
          >
            {loading ? (
              <HorizontalNavSkeleton />
            ) : (
              data?.map((item) => (
                <HorizontalNavItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  item={item.children}
                />
              ))
            )}
          </Stack>
        </Scrollbar>
      </Toolbar>
      <Box
        sx={{
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          height: 24,
          zIndex: -1,
          opacity: 0.48,
          position: 'absolute',
          borderBottom: (theme) => `solid 1px ${theme.palette.action.selected}`,
        }}
      />
    </AppBar>
  );
};

export default HorizontalSection;
