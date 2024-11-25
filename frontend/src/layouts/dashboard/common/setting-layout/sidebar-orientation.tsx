import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';

import { useSettingsLayout } from '../../../../store/settings';

import { linearGradient } from '../../../../utils/hex-to-rgb';

interface SidebarOrientationProps {
  orientation: string;
}

export const SidebarOrientation = ({ orientation } : SidebarOrientationProps) => {
  
  const handleOrientation = useSettingsLayout((state) => state.setNavConfig);
  const orientationStore = useSettingsLayout((state) => state.orientationStore);

  const { palette } : {palette:any} = useTheme();

  const selected =
    orientationStore === orientation
      ? {
          backgroundColor: 'background.selected.default',
          boxShadow: 'inherit',
        }
      : {
          backgroundColor: 'transparent',
        };

  const gradient = linearGradient(palette.primary.light, palette.primary.main);

  const vertical = (
    <>
      <Stack
        sx={{
          gap: '4px',
          flexShrink: 0,
          padding: '4px',
          width: 28,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.action.hover}`,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: 8,
            height: 8,
            background: orientationStore === 'vertical' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: '100%',
            height: 3,
            opacity: 0.48,
            background: orientationStore === 'vertical' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: '100%',
            maxWidth: 12,
            height: 3,
            opacity: 0.24,
            background: orientationStore === 'vertical' ? gradient : 'inherit',
          }}
        />
      </Stack>
      <Box padding="4px" flexGrow={1} height="100%" width="100%">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            opacity: 0.24,
            borderRadius: '4px',
            background: orientationStore === 'vertical' ? gradient : 'inherit',
          }}
        />
      </Box>
    </>
  );

  const horizontal = (
    <>
      <Stack
        sx={{
          gap: '4px',
          flexDirection: 'row',
          flexShrink: 0,
          padding: '4px',
          width: '100%',
          height: '16px',
          alignItems: 'center',
          borderRight: 'unset',
          borderBottom: (theme) => `1px solid ${theme.palette.action.hover}`,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: 8,
            height: 8,
            background: orientationStore === 'horizontal' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: 12,
            height: 3,
            opacity: 0.48,
            background: orientationStore === 'horizontal' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: 8,
            maxWidth: 12,
            height: 3,
            opacity: 0.24,
            background: orientationStore === 'horizontal' ? gradient : 'inherit',
          }}
        />
      </Stack>
      <Box padding="4px" flexGrow={1} height="100%" width="100%">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            opacity: 0.24,
            borderRadius: '4px',
            background: orientationStore === 'horizontal' ? gradient : 'inherit',
          }}
        />
      </Box>
    </>
  );

  const mini = (
    <>
      <Stack
        sx={{
          gap: '4px',
          flexShrink: 0,
          padding: '4px',
          width: 17,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.action.hover}`,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: 8,
            height: 8,
            background: orientationStore === 'collapse' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: '100%',
            height: 3,
            opacity: 0.48,
            background: orientationStore === 'collapse' ? gradient : 'inherit',
          }}
        />
        <Box
          sx={{
            flexShrink: 0,
            borderRadius: '4px',
            width: '100%',
            maxWidth: 12,
            height: 3,
            opacity: 0.24,
            background: orientationStore === 'collapse' ? gradient : 'inherit',
          }}
        />
      </Stack>
      <Box padding="4px" flexGrow={1} height="100%" width="100%">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            opacity: 0.24,
            borderRadius: '4px',
            background: orientationStore === 'collapse' ? gradient : 'inherit',
          }}
        />
      </Box>
    </>
  );

  return (
    <Button
      sx={{
        border: '1px solid rgba(145, 158, 171, 0.08)',
        color: 'text.disabled',
        transition: 'none',
        flexDirection: orientation === 'horizontal' ? 'column' : 'row',
        padding: 0,
        width: '100%',
        height: '56px',
        ...selected,
      }}
      size="large"
      type="button"
      color="inherit"
      variant="outlined"
      onClick={() => handleOrientation(orientation)}
    >
      {orientation === 'vertical' && vertical}
      {orientation === 'horizontal' && horizontal}
      {orientation === 'collapse' && mini}
    </Button>
  );
};