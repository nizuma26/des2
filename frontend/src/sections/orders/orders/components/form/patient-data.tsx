//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFormContext } from 'react-hook-form';

import { OrderFormValues } from '../../../../../types/orders/orders';

import { usePatient } from './use-patient';

import { fYear } from '../../../../../utils/format-time';


export default function PatientData() {
  const { getValues } = useFormContext<OrderFormValues>();

  const patientData = usePatient((state) => state.patient);

  const gender =
    patientData?.gender === 'M' ? 'Masculino' : patientData?.gender === 'F' ? 'Femenino' : '';

  const age = fYear(patientData?.birthdate);

  const patientNumber = getValues('patient_number');

  return (
    <Stack spacing={2}>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Nº de paciente del día</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {patientNumber}
        </Box>
      </Stack>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Correo</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {patientData?.email}
        </Box>
      </Stack>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Nro de teléfono</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {patientData?.phone_number}
        </Box>
      </Stack>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Género</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {gender}
        </Box>
      </Stack>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Fecha de nacimiento</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {patientData?.birthdate}
        </Box>
      </Stack>
      <Stack px={1}>
        <Typography variant="subtitle2" py='2px'>Edad</Typography>
        <Box
          p={1}
          bgcolor="background.neutral"
          height={30}
          typography="subtitle2"
          borderRadius="4px"
          fontSize={12}
        >
          {patientData?.birthdate ? age[0] + ' ' + age[1] : ''}
        </Box>
      </Stack>
    </Stack>
  );
}
