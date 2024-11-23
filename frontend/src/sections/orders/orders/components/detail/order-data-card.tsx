import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { OrderDataCardProps } from './types';
import Label from '../../../../../components/label';

// -----------------------------------------------

function OrderDataCard({
  code,
  comment,
  cost_type,
  hour,
  laboratory,
  order_date,
  status,
  user,
  cash_register,
  payment_type
}: OrderDataCardProps) {

  return (
    <Card>
      <CardHeader title='Datos de la orden' />
      <Box px={3} pt={3}>
        <Label color="secondary" sx={{ typography: 'subtitle2' }}>
          {status}
        </Label>
      </Box>
      <CardContent>
        <Stack spacing={2}>         
          <Stack spacing={1} direction="row">
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Fecha de emisión
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {order_date} a las {hour}
              </Box>
            </Stack>
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Caja
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {cash_register}
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={1} direction="row">
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Laboratorio
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {laboratory?.name}
              </Box>
            </Stack>
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Usuario
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {user}
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={1} direction="row">
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Tipo de costo
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {cost_type}
              </Box>
            </Stack>
          </Stack>        
          <Stack typography="subtitle2" px={1}>
            <Box maxWidth={1} alignItems="flex-start">
              Comentario:
            </Box>
            <Box
              component="p"
              maxWidth={1}
              color="text.secondary"
              alignItems="flex-start"
              bgcolor="background.neutral"
              borderRadius={1}
              px={2}
              pt={1}
              pb={3}
            >
              {comment}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderDataCard;
