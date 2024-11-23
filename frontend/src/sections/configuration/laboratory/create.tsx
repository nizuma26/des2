//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';
import { breadcrumbAddPage } from './context';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LaboratoryForm from './components/laboratory-form';

// ----------------------------------------------------------------------

export default function CreateLaboratory() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['labs'] });
    queryClient.invalidateQueries({ queryKey: ['active_laboratories'] });
  }

  const DEFAULT_VALUES = {
    name: '',
    document: '',
    email: '',
    local_phone: null,
    mobile_phone: null,
    manager: '',
    cedula: null,
    address: '',
    description: '',
    is_main: false,
    is_active: true,
    logo: null,
  }

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo laboratorio</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <LaboratoryForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
    </Container>
  );
}
