import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { useFormContext, useWatch } from 'react-hook-form';

import { SecondaryPriceProps } from './types';

import { LabTestFormValues } from '../../../../../types/configuration/lab-test';
import { useExchangeRate } from '../../../../../hooks/use-exchange-rate';

// --------------------------------------------------------------

export const SecondaryPrice = ({
  control,
  priceName,
  exchangeRate,
  currencyCode,
}: SecondaryPriceProps) => {
  const secondaryPrice = useWatch({
    name: `prices.${priceName}`,
    control,
  });

  const price = (secondaryPrice || 0) / (exchangeRate || 1);

  return (
    <Box
      display="flex"
      bgcolor="background.neutral"
      p={2}
      borderRadius={1}
      color="text.secondary"
      typography="subtitle2"
      gap={2}
    >
      <Box>{currencyCode}</Box>
      {price.toFixed(2)}
    </Box>
  );
};

export default function PricesSection() {
  const { exchangeRate, mainCurrencyCode, secondaryCurrencyCode } = useExchangeRate();

  const { register, control } = useFormContext<LabTestFormValues>();

  const column = secondaryCurrencyCode ? "2" : "1"

  return (
    <>
      <Box p={3}>
        <Typography color="text.secondary" fontWeight={600} pb={2}>
          Valero-Amaya
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: `repeat(${column}, 1fr)`,
            },
          }}
        >
          <TextField
            fullWidth
            label="Particular"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{mainCurrencyCode}</InputAdornment>,
            }}
            {...register('prices.standard', {
              required: 'Debe ingresar una cantidad valida',
              min: {
                value: 0,
                message: 'El valor no puede ser negativo',
              },
            })}
          />
          {secondaryCurrencyCode && (
            <SecondaryPrice
              control={control}
              priceName="standard"
              exchangeRate={exchangeRate}
              currencyCode={secondaryCurrencyCode}
            />
          )}
          <TextField
            fullWidth
            label="Emergencia"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{mainCurrencyCode}</InputAdornment>,
            }}
            {...register('prices.emergency', {
              required: 'Debe ingresar una cantidad valida',
              min: {
                value: 0,
                message: 'El valor no puede ser negativo',
              },
            })}
          />
          {secondaryCurrencyCode && (
            <SecondaryPrice
              control={control}
              priceName="emergency"
              exchangeRate={exchangeRate}
              currencyCode={secondaryCurrencyCode}
            />
          )}
          <TextField
            fullWidth
            label="Seguro/Empresa"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{mainCurrencyCode}</InputAdornment>,
            }}
            {...register('prices.affiliated', {
              required: 'Debe ingresar una cantidad valida',
              min: {
                value: 0,
                message: 'El valor no puede ser negativo',
              },
            })}
          />
          {secondaryCurrencyCode && (
            <SecondaryPrice
              control={control}
              priceName="affiliated"
              exchangeRate={exchangeRate}
              currencyCode={secondaryCurrencyCode}
            />
          )}
          <TextField
            fullWidth
            label="Domicilio"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{mainCurrencyCode}</InputAdornment>,
            }}
            {...register('prices.home_service', {
              required: 'Debe ingresar una cantidad valida',
              min: {
                value: 0,
                message: 'El valor no puede ser negativo',
              },
            })}
          />
          {secondaryCurrencyCode && (

            <SecondaryPrice
            control={control}
            priceName="home_service"
            exchangeRate={exchangeRate}
            currencyCode={secondaryCurrencyCode}
            />
          )}
          <TextField
            fullWidth
            label="Fin de semana y feriados"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{mainCurrencyCode}</InputAdornment>,
            }}
            {...register('prices.holiday', {
              required: 'Debe ingresar una cantidad valida',
              min: {
                value: 0,
                message: 'El valor no puede ser negativo',
              },
            })}
          />
          {secondaryCurrencyCode && (

            <SecondaryPrice
            control={control}
            priceName="holiday"
            exchangeRate={exchangeRate}
            currencyCode={secondaryCurrencyCode}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
