import type { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export type SvgColorProps = BoxProps & {
  src: string;
};

export type SvgIconProps = BoxProps & {
  icon: string;
};