//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';

import { LabTestFormValues } from '../../../types/configuration/lab-test';

import { BREADCRUMB_ADD_PAGE, QUERY_KEYS } from './context';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import LabTestForm from './components/form/lab-test-form';

// ----------------------------------------------------------------------

export default function CreateLabTest() {

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.list] });
  };

  const DEFAULT_VALUES: LabTestFormValues = {
    abbreviation: '',
    name: '',
    category: null,
    container: null,
    sample: null,
    description: '',
    indications: '',
    parameters: [],
    prices: {
      standard: 0.00,
      emergency: 0.00,
      affiliated: 0.00,
      home_service: 0.00,
      holiday: 0.00,
    },
    items: []
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo Examen</Typography>
          <Breadcrumb options={BREADCRUMB_ADD_PAGE} />
        </Box>
      </Stack>
      <LabTestForm
        invalidateQuery={invalidateQuery}
        values={DEFAULT_VALUES}
      />
    </Container>
  );
}
