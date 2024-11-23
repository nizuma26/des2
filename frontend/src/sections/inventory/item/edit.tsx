//@mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { ItemFormValue } from '../../../types/inventory/item';

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ItemForm from './components/item-form';
import { useGetData } from '../../../hooks/use-get-data';

// ----------------------------------------------------------------------

export default function EditItem() {
    
  const { id } = useParams();

  const { data={}, isLoading } = useGetData({
    url: `api/inventory/item/${id}/`,
    queryKey: ['item', id],
  })

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
    queryClient.invalidateQueries({ queryKey: ['item', id] });
  };

  const DEFAULT_VALUES:ItemFormValue = {
    id: data.id,
    name: data.name,
    description: data?.description,
    image: data?.image,
    is_active: data.is_active,
    use_in_tests: data.use_in_tests,
    with_tax: data.with_tax,
    is_inventoriable: data.is_inventoriable,
    category: data.category?.id,
    measure_unit: data.measure_unit?.id,
    model: data.model?.id,
  }

  const options = [
    { name: 'Dashboard', route: '/', type: 'link' },
    { name: 'Artículos', route: '/item', type: 'link' },
    { name: data?.code, type: 'typography' },
  ];


  return (
    <Container maxWidth="xl" className='fade_down_animation'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar artículo</Typography>
          <Breadcrumb options={options} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
      ) : (
        <ItemForm values={DEFAULT_VALUES} invalidateQuery={invalidateQuery} />
      )}
    </Container>
  );
}
