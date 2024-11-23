//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { LabTestProfileFormValues } from '../../../types/configuration/lab-test-profile';

import { useGetData } from '../../../hooks/use-get-data';

import { QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LabTestProfileForm from './components/form/lab-test-profile-form';

// ----------------------------------------------------------------------

export default function EditLabTestProfile() {

  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `api/config/lab-test-profile/${id}/`,
    queryKey: [QUERY_KEYS.list, id],
    enabled: !!id
  });

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list, id] });
  };

  const DEFAULT_VALUES: LabTestProfileFormValues = {
    id: data?.id,
    abbreviation: data?.abbreviation,
    name: data?.name,
    category: data?.category?.id,
    description: data?.description,
    indications: data?.indications,
    prices: data?.prices,
    lab_tests: data?.lab_tests
  };

  const breadcrumb = [
    {
      name: 'Dashboard',
      route: '/',
      type: 'link',
    },
    {
      name: 'Perfiles',
      route: '/lab-test/profile',
      type: 'link',
    },
    {
      name: data?.name ?? 'Editar perfil',
      type: 'typography',
    },
  ]

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar Perfil</Typography>
          <Breadcrumb options={breadcrumb} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <LabTestProfileForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
      )}
    </Container>
  )
}
