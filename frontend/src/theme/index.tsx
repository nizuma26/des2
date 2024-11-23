import { useMemo, ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { useSettingsLayout } from '../store/settings';

import { palette } from './palette';
import { createPresetColor, error } from './presets-color';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

export default function ThemeProvider({ children }: { children: ReactNode }) {
    
  const mode = useSettingsLayout((state) => state.darkMode);
  const themeColorPresets = useSettingsLayout((state) => state.themeColorPresets);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(mode),
        ...createPresetColor(themeColorPresets),
      },
      typography,
      shadows: shadows(),
      customShadows: customShadows(mode),
      shape: { borderRadius: 9 },
    }),
    [mode, themeColorPresets]
  );

  const theme = createTheme(memoizedValue);
  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
