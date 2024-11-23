//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SupplierDataCardProps } from './types';

import { useSupplier } from './use-supplier';
import { useEffect } from 'react';

// ------------------------------------------------------

export default function SupplierDataCard({ setPaymentTerm }: SupplierDataCardProps) {
  const supplierData = useSupplier((state) => state.supplier);

  useEffect(() => {
    if (!!supplierData) setPaymentTerm(supplierData?.credit_days ?? null);
  }, [supplierData])


  return (
    <Stack spacing={1}>
      <Stack px={1} spacing={1}>
        <Typography variant="subtitle2">Correo Electrónico</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height="auto"
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {supplierData?.email || '-'}
        </Box>
      </Stack>
      <Stack px={1} spacing={1}>
        <Typography variant="subtitle2">Nro de teléfono</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height="auto"
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {supplierData?.phone_number || '-'}
        </Box>
      </Stack>
      <Stack width={1} px={1} spacing={1}>
        <Typography variant="subtitle2">Días de crédito</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height="auto"
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {supplierData?.credit_days || '-'}
        </Box>
      </Stack>
      <Stack px={1} spacing={1}>
        <Typography variant="subtitle2">Dirección</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height="auto"
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {supplierData?.address || '-'}
        </Box>
      </Stack>
    </Stack>
  );
}
