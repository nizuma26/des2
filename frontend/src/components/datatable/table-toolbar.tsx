import { ReactNode } from 'react';

import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

interface ToolbarProps {
  children?: ReactNode
}

export default function TableToolbar({ children } : ToolbarProps) {

  return (
    <Toolbar
      sx={{
        height: 1,
        maxHeight: 1,
        display: 'flex',
        py: 3,
        gap: 4,
      }}
    >
      <Stack width={1} direction={{sm: 'column', md: 'row'}} gap={3}>
        {children && children}
      </Stack>
    </Toolbar>
  );
}
