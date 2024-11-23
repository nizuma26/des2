//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';

import { BREADCRUMB_ADD_PAGE, DEFAULT_FORM_VALUES, QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import PatientForm from './components/form/patient-form';

// ----------------------------------------------------------------------

export default function CreatePatient() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
  };

  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo paciente</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      <PatientForm invalidateQuery={invalidateQuery} values={DEFAULT_FORM_VALUES} />
    </Container>
  );
}
