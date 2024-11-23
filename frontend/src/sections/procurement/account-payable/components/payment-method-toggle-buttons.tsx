//@mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller, FieldValues } from 'react-hook-form';

import { PaymentMethodToggleButtonsProps } from './types';

import { PAYMENT } from '../context';

import { SvgIcon } from '../../../../components/svg-color';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
}));

// -------------------------------------------------------------------------------

const PaymentMethodToggleButtons = <TField extends FieldValues>({
  name,
  control,
}: PaymentMethodToggleButtonsProps<TField>) => {
  return (
    <Controller
      name={name}
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
          <Box
            sx={{
              border: '1px solid rgba(125, 128, 120, 0.13)',
              p: 1,
              borderRadius: 1,
              ...(!!error && { ...errorStyleToggleButtonGroup }),
            }}
          >
            <StyledToggleButtonGroup
              color="primary"
              value={value}
              exclusive
              onChange={(event, value) => handleChange(value)}
              aria-label="text alignment"
              sx={{
                display: 'grid',
                gap: '7px',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
              }}
            >
              {PAYMENT.methods.map((p, index) => (
                <ToggleButton
                  key={index}
                  value={p.value}
                  aria-label="left aligned"
                  sx={{ bgcolor: errorBgColor, color: errorColor, p: 1 }}
                >
                  <SvgIcon icon={p.icon} />
                  <Typography variant="subtitle2" fontSize={12}>
                    {p.label}
                  </Typography>
                </ToggleButton>
              ))}
            </StyledToggleButtonGroup>
              <FormHelperText error={!!error} sx={{ textAlign: 'center', mt: 1 }}>
                {error?.message}
              </FormHelperText>
          </Box>
        );
      }}
    />
  );
};

export default PaymentMethodToggleButtons;
