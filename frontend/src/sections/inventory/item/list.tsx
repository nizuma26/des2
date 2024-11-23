import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { breadcrumbViewPage } from './context';

import { RouterLink } from '../../../routes/components';
import Iconify from '../../../components/iconify';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ItemTable from './components/item-table';

// ----------------------------------------------------------------------

export default function ItemList() {

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Listado de artículos</Typography>
          <Breadcrumb options={breadcrumbViewPage} />
        </Box>
        <Link component={RouterLink} href="/item/add">
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill"/>}>
            Nuevo Artículo
          </Button>
        </Link>
      </Stack>
      <Card>
        <ItemTable />
      </Card>
    </Container>
  );
}
