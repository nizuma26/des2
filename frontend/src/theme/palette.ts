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
    selected: {
      default: optionSelected.lightBg,
    },
    transparent: {
      default: transparent.light,
      popover: 'rgba(255, 255, 255, 0.9)',
    }
  },
  hover: {
    bgDefault: grey[700],
    textDefault: grey[100]
  },
  shadow: {
    primary: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    intence: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px'
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
    selected: {
      default: optionSelected.darkBg
    },
    transparent: {
      default: transparent.dark,
      popover: 'rgba(33, 43, 54, 0.9)',
    }
  },
  hover: {
    bgDefault: grey[400],
    textDefault: grey[900]
  },
  shadow: {
    primary: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px',
    intence: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px'
  },
  action: {
    ...action,
    active: grey[600],
  },
}

export const palette = (mode:boolean) => mode ? darkMode : lightMode

