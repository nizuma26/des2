import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import { InvoiceDataCardProps } from './types';

function InvoiceDataCard({
  amountPaid,
  discount,
  mainCurrencyCode,
  mainTotal,
  secondaryCurrencyCode,
  exchangeRate,
  secondaryTotal,
  totalLabTests,
  tax,
}: InvoiceDataCardProps) {
  const balance = mainTotal - amountPaid;
  return (
    <Card>
      <CardHeader title="Datos de la factura" />
      <CardContent sx={{ px: 0, py: 0 }}>
        <Stack
          direction="column"
          gap={3}
          alignItems="flex-end"
          textAlign="right"
          p={3}
          overflow="hidden"
        >
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex" color="text.secondary">
              Total de examenes
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end">
              {totalLabTests}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" color="text.secondary" gap={1}>
            <Box width={1} display="flex">
              Tasa de cambio
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end">
              {exchangeRate}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex" color="text.secondary">
              IVA
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end" color="text.secondary">
              {tax?.tax ?? '0%'}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex" color="text.secondary">
              Descuento {mainCurrencyCode}
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end" color="text.secondary">
              {discount}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex">
              Total {mainCurrencyCode}
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
              {mainTotal}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex">
              Total {secondaryCurrencyCode}
            </Box>
            <Box width={1} maxWidth={1} color="success.main">
              {secondaryTotal}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box component="h3" display="flex" typography="body3" px={3}>
        Datos del pago
      </Box>
      <CardContent sx={{ px: 0, py: 0 }}>
        <Stack
          direction="column"
          gap={3}
          alignItems="flex-end"
          textAlign="right"
          px={3}
          py={1}
          overflow="hidden"
        >
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex">
              Abonado
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
              {amountPaid}
            </Box>
          </Stack>
          <Stack width={1} direction="row" typography="subtitle2" gap={1}>
            <Box width={1} display="flex">
              Saldo
            </Box>
            <Box width={1} display="flex" justifyContent="flex-end" color="success.main">
              {balance.toFixed(2)}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InvoiceDataCard;
