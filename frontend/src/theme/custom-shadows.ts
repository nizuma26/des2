import { alpha } from '@mui/material/styles';

import { grey, info, error, blue, success, warning, secondary } from './presets-color';

// ----------------------------------------------------------------------

export function customShadows(darkMode:boolean) {

  const transparent = alpha(grey[500], 0.16);
  const transparent_dark = 'rgba(20, 20, 20, 0.16)'
  const transparent_light = alpha(grey[600], 0.08);

  const darkShadow = darkMode ? alpha(grey[900], 0.34) : alpha(grey[500], 0.24)

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    card: (darkMode ? `${transparent_dark} 1px 3px 3px -2px, ${transparent_dark} 1px 1px 4px 0px, ${transparent_dark} 0px 1px 8px 0px` : `${transparent_light} 0px 3px 3px -2px, ${transparent_light} 0px 3px 4px 0px, ${transparent_light} 0px 1px 8px 0px`),
    dropdown: `0 0 2px 0 ${alpha(grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(grey[500], 0.24)}`,
    dialog: `-40px 40px 80px -8px ${transparent}`,
    paper: `${darkShadow} 0px 0px 2px 0px, ${darkShadow} -20px 20px 40px -4px`,
    primary: `0 8px 16px 0 ${alpha(blue.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(info.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(error.main, 0.24)}`,
  };
}
