import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import dayjs from 'dayjs';

import { useQueryClient } from '@tanstack/react-query';

import { useGetData } from '../../../hooks/use-get-data';

import { BREADCRUMB_ADD_PAGE, QUERY_KEYS } from './context';

import PatientForm from './components/form/patient-form';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { PatientFormValues } from '../../../types/orders/patients';

// ----------------------------------------------------------------------

export default function EditPatient() {

  const { id } = useParams();

  const queryClient = useQueryClient();
  
  const { data = {}, isLoading } = useGetData({
    url: `api/orders/patient/${id}/`,
    queryKey: [QUERY_KEYS.list, id],
    enabled: !!id,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list, id] });
  };

  console.log(data)

  const DEFAULT_FORM_VALUES:PatientFormValues = {
    id: data?.id,
    names: data?.names,
    last_names: data?.last_names,
    birthdate: dayjs(data?.birthdate),
    address: data?.address,
    cedula: data?.cedula,
    email: data?.email,
    phone_number: data?.phone_number,
    gender: data?.gender,
    is_active: data?.is_active,
    affiliations: data?.affiliations,
  }

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar paciente</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <PatientForm invalidateQuery={invalidateQuery} values={DEFAULT_FORM_VALUES} />
      )}
    </Container>
  );
}
