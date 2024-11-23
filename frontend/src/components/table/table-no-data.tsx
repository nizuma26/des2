import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ colSpan=6, text='Sin resultados' }) {
  const icon = (src:string) => (
    <Box
      component="img"
      className="svg-color"
      sx={{
        width: '100%',
        maxWidth: '100px',
      }}
      src={src}
    />
  );

  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan+1} sx={{ py: 3}}>
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            pt: 2,
            pb: 5,
            height: '100%',
            borderRadius: '16px',
            backgroundColor: 'rgba(105, 108, 122, 0.03)',
            border: '1px dashed rgba(145, 158, 171, 0.09)',
          }}
        >
          {icon('/assets/icons/empty/ic_content.svg')}

          <Typography color='action.disabled'>
            <strong>{text}</strong>.
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}