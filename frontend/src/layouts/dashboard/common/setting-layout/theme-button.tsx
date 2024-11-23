import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { linearGradient } from '../../../../utils/hex-to-rgb';

import { useSettingsLayout } from '../../../../store/settings';

import { SVG_SUN, SVG_MOON } from '../../config-layout';

interface ThemeButtonProps {
  theme: string;
}

const ThemeButton = ({ theme }: ThemeButtonProps) => {
  
  const setDarkMode = useSettingsLayout((state: any) => state.setDarkMode);
  
  const { palette } = useTheme();

  const selected = {
    light: {
      backgroundColor: '#ffffff',
      boxShadow: 'rgba(145, 158, 171, 0.08) -24px 8px 24px -4px',
    },
    dark: {
      backgroundColor: '#212b36',
      boxShadow: 'rgba(0, 0, 0, 0.08) -24px 8px 24px -4px',
    },
  };

  const gradient = linearGradient(palette.primary.light, palette.primary.main);

  const mode = theme === 'dark';

  return (
    <Button
      sx={{
        border: '1px solid rgba(145, 158, 171, 0.08)',
        color: 'text.disabled',
        transition: 'none',
        width: 105,
        height: 80,
        ...(palette.mode === theme ? selected[theme] : { background: 'transparent' }),
      }}
      size="large"
      type="button"
      color="inherit"
      onClick={() => setDarkMode(mode)}
    >
      <Box
        component="span"
        sx={{
          width: 24,
          height: 24,
          display: 'inline-block',
          mask: theme === 'light' ? SVG_SUN : SVG_MOON,
          background:
            palette.mode === theme
              ? gradient
              : 'linear-gradient(135deg, rgb(145, 158, 171) 0%, rgb(99, 115, 129) 100%)',
        }}
      />
    </Button>
  );
};

export default ThemeButton