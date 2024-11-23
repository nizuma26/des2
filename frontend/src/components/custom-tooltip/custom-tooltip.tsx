import { ReactElement } from 'react';
//mui
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

interface CustomTooltipProps extends TooltipProps {
  children: ReactElement;
}

function CustomTooltip({ children, ...other }: CustomTooltipProps) {
  return (
    <Tooltip
      disableInteractive
      componentsProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: {
              backgroundColor: '#454F5B',
            },
          },
        },
      }}
      {...other}
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
