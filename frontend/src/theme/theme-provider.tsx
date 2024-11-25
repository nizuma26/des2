import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';

import { useSettingsLayout } from '../store/settings';

import { createTheme } from './create-theme';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const mode = useSettingsLayout((state) => state.darkMode);
  const presetColor = useSettingsLayout((state) => state.themeColorPresets);

  const theme = useMemo(() =>
    createTheme({ settings: { darkMode: mode, presetColor: presetColor } }),
    [mode, presetColor]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
