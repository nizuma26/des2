import  { createTheme as customTheme, type Theme, type ThemeOptions } from '@mui/material/styles';

import {  } from '@mui/material/styles';

import { PresetsColor } from './types';

import { shadows, typography, customShadows } from './core';
import { palette } from './palette';
import { createPresetColor } from './presets-color';
import { overrides } from './overrides';

// ----------------------------------------------------------------------

interface CreateThemeProps {
  settings: {
    darkMode: boolean,
    presetColor: PresetsColor
  }
}

export function createTheme({ settings }:CreateThemeProps): Theme {
  const initialTheme = {
    palette: {
      ...palette(settings.darkMode),
      ...createPresetColor(settings.presetColor),
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

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'typography',
    'breakpoints',
    'transitions',
    'cssVarPrefix',
    'unstable_sxConfig',
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}