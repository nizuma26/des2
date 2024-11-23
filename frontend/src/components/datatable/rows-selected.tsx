import { ReactNode } from 'react';
//@mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

interface RowsSelectedProps {
  numSelected: number;
  rowCount: number;
  notFound: boolean;
  onSelectAllClick: (checked: boolean) => void;
  dense: boolean;
  children?: ReactNode;
}

export default function RowsSelected({
  numSelected,
  rowCount,
  notFound,
  onSelectAllClick,
  dense,
  children,
}: RowsSelectedProps) {
  
  const size = dense ? 38 : 58;

  return (
    <Box position="relative">
      <Stack
        padding="checkbox"
        sx={{
          height: size,
          zIndex: 9,
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          paddingLeft: '4px',
          top: 0,
          left: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount && notFound === false}
          checked={rowCount > 0 && numSelected === rowCount && notFound === false}
          onChange={(event) => onSelectAllClick(event?.target?.checked)}
        />
        {numSelected > 0 && (
          <>
            <Typography component="div" variant="subtitle1" flexGrow={1} fontSize={14}>
              {numSelected} {numSelected > 1 ? 'seleccionados' : 'seleccionado'}
            </Typography>
            {children}
          </>
        )}
      </Stack>
    </Box>
  );
}
