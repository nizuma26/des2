//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import { PatientDataCardProps } from './types';

import { fYear } from '../../../../../utils/format-time';

// ------------------------------------------------------------------------

export default function PatientDataCard({ patient, affiliation }: PatientDataCardProps) {
  const gender = patient?.gender === 'M' ? 'Masculino' : patient?.gender === 'F' ? 'Femenino' : '';

  const age = fYear(patient?.birthdate);

  return (
    <Card>
      <CardHeader title="Datos del paciente" />
      <CardContent>
        <Stack spacing={2}>
          <Stack px={1}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Paciente
            </Typography>
            <Box
              p={1}
              bgcolor="background.neutral"
              height={32}
              typography="subtitle2"
              borderRadius="4px"
              fontSize={13}
            >
              {patient?.full_name}
            </Box>
          </Stack>
          <Stack px={1}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Empresa
            </Typography>
            <Box
              p={1}
              bgcolor="background.neutral"
              height={32}
              typography="subtitle2"
              borderRadius="4px"
              fontSize={13}
            >
              {affiliation?.name ?? 'Sin afiliación'}
            </Box>
          </Stack>
          <Stack width={1} direction={{xs: "column", sm: "row"}} spacing={1}>
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Cédula
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {patient?.cedula}
              </Box>
            </Stack>
            <Stack width={1} px={1}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Género
              </Typography>
              <Box
                p={1}
                bgcolor="background.neutral"
                height={32}
                typography="subtitle2"
                borderRadius="4px"
                fontSize={13}
              >
                {gender}
              </Box>
            </Stack>
          </Stack>

          <Stack px={1}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Fecha de nacimiento
            </Typography>
            <Box
              p={1}
              bgcolor="background.neutral"
              height={32}
              typography="subtitle2"
              borderRadius="4px"
              fontSize={13}
            >
              {patient?.birthdate}
            </Box>
          </Stack>
          <Stack px={1}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Edad
            </Typography>
            <Box
              p={1}
              bgcolor="background.neutral"
              height={32}
              typography="subtitle2"
              borderRadius="4px"
              fontSize={13}
            >
              {age[0] + ' ' + age[1]}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
