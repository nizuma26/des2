import { useParams } from 'react-router-dom';
//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useQueryClient } from '@tanstack/react-query';

import { Laboratory } from '../../../types/configuration/laboratory';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LaboratoryForm from './components/laboratory-form';
import { useGetData } from '../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function LaboratoryEdit() {

  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `api/config/laboratory/${id}/`,
    queryKey: ['lab', id]
  })

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
      queryClient.invalidateQueries({ queryKey: ['labs'] });
      queryClient.invalidateQueries({ queryKey: ['lab', id] });
      queryClient.invalidateQueries({ queryKey: ['active_laboratories'] });
  }


  const options = [
    { name: 'Dashboard', route: '/', type: 'link' },
    { name: 'Laboratorios', route: '/laboratory', type: 'link' },
    { name: !isLoading && data.name, type: 'typography' },
  ];

  const DEFAULT_VALUES:Laboratory = {
    id: data?.id,
    name: data?.name,
    document: data?.document,
    email: data?.email,
    local_phone: data?.local_phone,
    mobile_phone: data?.mobile_phone,
    manager: data?.manager,
    cedula: data?.cedula,
    address: data?.address,
    description: data?.description,
    is_main: data?.is_main,
    is_active: data?.is_active,
    logo: data?.logo
  }

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar laboratorio </Typography>
          <Breadcrumb options={options} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <LaboratoryForm
          values={DEFAULT_VALUES}
          invalidateQuery={invalidateQuery}
        />
      )}
    </Container>
  );
}
