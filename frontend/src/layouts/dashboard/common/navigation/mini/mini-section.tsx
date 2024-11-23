import Box from '@mui/material/Box';

import { NavSectionProps } from '../types';
import { NAV } from '../../../config-layout';

import { Logo } from '../../../../../components/logo';
import MiniSectionContent from './mini-section-content';
import MiniNavSkeleton from './mini-nav-skeleton';

const MiniSection = ({ data, loading = true, bgcolor }: NavSectionProps) => (
  <Box
    sx={{
      width: NAV.WIDTH_COLLAPSE,
      height: 1,
      position: 'fixed',
      bgcolor: bgcolor,
      borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
      zIndex: 1220,
    }}
  >
    <Logo
      sx={{
        mt: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '11px',
      }}
      titleSx={{
        fontSize: '12px',
        mt: '5px',
        mr: '2px',
      }}
    />
    {loading ? <MiniNavSkeleton /> : <MiniSectionContent data={data} bgcolor={bgcolor} />}
  </Box>
);

export default MiniSection;
