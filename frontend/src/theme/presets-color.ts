// SETUP COLORS
export type PresetsColor = 'blue' | 'secondary' | 'cyan' | 'success' | 'warning' | 'error';

export const grey = {
  0: '#FFFFFF',
  50: '#FCFDFD',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#1C252E',
  900: '#141A21',
  1000: '#2c3641',
};

export const blue = {
  lighter: '#CCF4FE',
  light: '#68CDF9',
  main: '#078dee',
  dark: '#1565c0',
  darker: '#012972',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#CCFBF1',
  light: '#5EEAD4',
  main: '#14B8A6',
  dark: '#0D9488',
  darker: '#0F766E',
};

export const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
  gradient:
    'linear-gradient(135deg, rgba(97, 243, 243, 0.2), rgba(0, 184, 217, 0.2)) rgb(255, 255, 255)',
};

export const success = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00a76f',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
  gradient:
    'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)',
};

export const warning = {
  lighter: '#fdebd7',
  light: '#fad3ae',
  main: '#f18a46',
  dark: '#ed6b22',
  darker: '#b93d15',
  contrastText: grey[800],
  gradient:
    'linear-gradient(135deg, rgba(255, 214, 102, 0.2), rgba(255, 171, 0, 0.2)) rgb(255, 255, 255)',
};

export const error = {
  lighter: '#FFEAD3',
  light: '#FFAF7C',
  main: '#FF5C26',
  dark: '#E53935',
  darker: '#7A070B',
  contrastText: '#FFFFFF',
  gradient:
    'linear-gradient(135deg, rgba(255, 172, 130, 0.2), rgba(255, 86, 48, 0.2)) rgb(255, 255, 255)',
};

export const cyan = {
  lighter: '#d9e5ff',
  light: '#8eb6ff',
  main: '#4a73ee',
  dark: '#254EDB',
  darker: '#1939B7',
  gradient:
    'linear-gradient(135deg, rgba(118, 176, 241, 0.2), rgba(32, 101, 209, 0.2)) rgb(255, 255, 255)',
};

const base = {
  blue,
  secondary,
  info,
  success,
  warning,
  error,
  cyan,
};

export function createPresetColor(presets:PresetsColor) {
  return {
      ...base,
      primary: base[presets],
  };
}
