import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import { useWatch } from 'react-hook-form';

import TaxSearch from '../../../../common/autocompletes/tax-search';

import { CurrencyTaxProps } from '../types';

function CurrencyTax({ control }: CurrencyTaxProps) {
  const withTax = useWatch({
    name: 'with_tax',
    control,
  });
  return (
    <Collapse in={withTax}>
      {withTax && (
        <Box mt={3}>
          <TaxSearch control={control} name="tax" isRequired typeTax="Pagos" />
        </Box>
      )}
    </Collapse>
  );
}

export default CurrencyTax;
