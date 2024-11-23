//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useQueryClient } from '@tanstack/react-query';

import { ItemFormValue } from '../../../types/inventory/item';

import { breadcrumbAddPage } from './context';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ItemForm from './components/item-form';

// ----------------------------------------------------------------------

export default function CreateItem() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  };

  const DEFAULT_VALUES:ItemFormValue = {
    name: '',
    description: '',
    image: null,
    is_active: true,
    use_in_tests: false,
    is_inventoriable: true,
    with_tax: false,
    category: null,
    measure_unit: null,
    model: null,
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Nuevo artículo</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      <ItemForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
    </Container>
  );
}
