//@mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller } from 'react-hook-form';

import { PaymentToggleButtonsProps } from './types';

import { PAYMENT } from './context';

import Iconify from '../../../../components/iconify';
import TextField from '@mui/material/TextField';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    display: 'flex',
    gap: 3,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
    border: '1px solid rgba(145, 158, 171, 0.22)',
  },
}));

// -------------------------------------------------------------------------------

const PaymentToggleButtons = ({ control }: PaymentToggleButtonsProps) => {
  return (
    <Controller
      name="payment_method"
      control={control}
      rules={{ required: 'Debe escoger un método de pago' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const errorColor = !!error ? 'rgba(241, 88, 71, 0.90)' : 'text.secondary';
        const errorBgColor = !!error ? 'rgba(241, 88, 71, 0.26)' : 'inherit';
        const errorStyleToggleButtonGroup = { p: 2, border: '1px dashed rgba(241, 88, 71, 0.59)' };

        const handleChange = (paymentMethod: string) => {
          onChange(paymentMethod);
        };

        return (
          <StyledToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            onChange={(event, value) => handleChange(value)}
            aria-label="text alignment"
            sx={{
              display: 'grid',
              gap: '4px',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
              ...(!!error && { ...errorStyleToggleButtonGroup }),
            }}
          >
            {PAYMENT.methods.map((p, index) => (
              <ToggleButton
                key={index}
                value={p.value}
                aria-label="left aligned"
                sx={{ bgcolor: errorBgColor, color: errorColor, p: 1 }}
              >
                <Iconify icon="fa-solid:money-bill-wave" />
                <Typography variant="subtitle2">{p.label}</Typography>
              </ToggleButton>
            ))}
            <FormHelperText error={!!error} sx={{ textAlign: 'center' }}>
              {error?.message}
            </FormHelperText>
          </StyledToggleButtonGroup>
        );
      }}
    />
  );
};

export default PaymentToggleButtons;
