import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function TableLoadingData({ colSpan=6 }) {

  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan+1} sx={{ py: 3 }}>
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
            height: '100%',
          }}
        >          
          <CircularProgress />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
