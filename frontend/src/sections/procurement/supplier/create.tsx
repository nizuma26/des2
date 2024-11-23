//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';

import { breadcrumbAddPage, DEFAULT_FORM_VALUES } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import SupplierForm from './components/supplier-form';

// ----------------------------------------------------------------------

export default function CreateSupplier() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['suppliers'] });
  };

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo proveedor</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <SupplierForm invalidateQuery={invalidateQuery} values={DEFAULT_FORM_VALUES} />
    </Container>
  );
}
