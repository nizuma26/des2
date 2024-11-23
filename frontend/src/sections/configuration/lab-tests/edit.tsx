//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { LabTestFormValues } from '../../../types/configuration/lab-test';

import { useGetData } from '../../../hooks/use-get-data';

import { BREADCRUMB_ADD_PAGE, QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LabTestForm from './components/form/lab-test-form';

// ----------------------------------------------------------------------

export default function EditLabTest() {
  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `api/config/lab-test/${id}/`,
    queryKey: [QUERY_KEYS.list, id],
    enabled: !!id
  });

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list, id] });
  };

  const DEFAULT_VALUES: LabTestFormValues = {
    id: data?.id,
    abbreviation: data?.abbreviation,
    name: data?.name,
    category: data?.category?.id,
    container: data?.container?.id,
    sample: data?.sample?.id,
    description: data?.description,
    indications: data?.indications,
    parameters: data?.parameters,
    prices: data?.prices,
    items: data?.items
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar Examen</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <LabTestForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
      )}
    </Container>
  )
}
