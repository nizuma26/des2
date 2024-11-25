import { alpha } from '@mui/material/styles';
import { grey } from './presets-color';

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const transparent = {
  light: 'rgba(255, 255, 255, 0.9)',
  dark: 'rgba(22, 28, 36, 0.9)',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.13),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const optionSelected = {
  lightBg: '#ffffff',
  darkBg: '#212b36',
  colorSelected: 'linear-gradient(135deg, rgb(104, 205, 249) 0%, rgb(7, 141, 238) 100%)',
  colorDefault: 'linear-gradient(135deg, rgb(145, 158, 171) 0%, rgb(99, 115, 129) 100%)'
}

const base = {
  grey,
  common,
  divider: alpha(grey[500], 0.1),
};

const lightMode = {
  ...base,
  mode: 'light',
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  },
  background: {
    paper: grey[0],
    default: grey[100],
    neutral: grey[200],
  },
  action: {
    ...action,
    active: grey[600],
  },
}

const darkMode = {
  ...base,
  mode: 'dark',
  text: {
    primary: grey[100],
    secondary: grey[500],
    disabled: grey[600],
  },
  background: {
    paper: grey[800],
    default: grey[900],
    neutral: grey[1000],
  },
  action: {
    ...action,
    active: grey[600],
  },
}

export const palette = (mode:boolean) => mode ? darkMode : lightMode

