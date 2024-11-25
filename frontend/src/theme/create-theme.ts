import  { createTheme as customTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

import {  } from '@mui/material/styles';

import { PresetsColor } from './types';

import { shadows, typography, customShadows } from './core';
import { palette } from './palette';
import { overrides } from './overrides';

// ----------------------------------------------------------------------

interface CreateThemeProps {
  settings: {
    darkMode: boolean,
    presetColor: PresetsColor
  }
}

export function createTheme({ settings }:CreateThemeProps):Theme {
  const initialTheme = {
    palette: {
      ...palette(settings.darkMode, settings.presetColor)
    },
    shadows: shadows(settings.darkMode),
    customShadows: customShadows(settings.darkMode),
    shape: { borderRadius: 8 },
    typography,
  };

  const theme = customTheme(initialTheme as ThemeOptions);
  theme.components = overrides(theme);

  return theme;
}