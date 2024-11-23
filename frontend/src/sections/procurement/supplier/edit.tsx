import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetData } from '../../../hooks/use-get-data';

import { useQueryClient } from '@tanstack/react-query';

import { breadcrumbAddPage } from './context';

import SupplierForm from './components/supplier-form';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

export default function EditSupplier() {

  const { id } = useParams();

  const queryClient = useQueryClient();
  
  const { data = {}, isLoading } = useGetData({
    url: `api/procurement/supplier/${id}/`,
    queryKey: ['supplier', id],
    enabled: !!id,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    queryClient.invalidateQueries({ queryKey: ['supplier', id] });
  };

  return (
    <Container maxWidth="xl" className="fade_down_animation">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Box>
          <Typography variant="h4">Editar proveedor</Typography>
          <Breadcrumb options={breadcrumbAddPage} />
        </Box>
      </Stack>
      {isLoading ? (
        <Box width={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <SupplierForm invalidateQuery={invalidateQuery} values={{ ...data }} />
      )}
    </Container>
  );
}
