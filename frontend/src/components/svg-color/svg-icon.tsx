import { SvgColor } from './svg-color';
import { SvgIconProps } from './types';

export const SvgIcon = ({ icon, sx, width = 22, height = 22 }: SvgIconProps) => (
  <SvgColor src={`/assets/icons/common/${icon}.svg`} sx={{ width: width, height: height, ...sx }} />
);
