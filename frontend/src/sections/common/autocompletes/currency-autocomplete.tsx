//@mui
import IconButton from '@mui/material/IconButton';

import { Control, useFormContext } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';
import { useDialogStore } from '../../../components/dialog';

import { Purchase } from '../../../types/procurements/purchase';
import { Currency } from '../../../types/configuration/currency';
import { AutocompleteOptions } from './types';

import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import Iconify from '../../../components/iconify';

import CurrencyModal from '../currency-modal';

interface VoucherAutocompleteProps {
  control: Control<Purchase>;
}

const CurrencyAutocomplete = ({ control }: VoucherAutocompleteProps) => {
  const { data = [], isLoading } = useGetData({
    url: 'api/config/currency/active-currencies/',
    queryKey: ['active-currencies'],
    staleTime: 60,
  });

  const { setValue } = useFormContext();

  const options = data.map((i: Currency) => {
    return { value: i.id, label: `${i.code}-${i.name}` };
  });

  const showDialog = useDialogStore.getState().showDialog;

  const onSelected = (selected: AutocompleteOptions | null) => {
    const currency = data.find((i: Currency) => {
      return Number(selected?.value) === i.id;
    });
    const exchange_rate = currency ? Number(currency?.exchange_rate) : 0.0;
    setValue('exchange_rate', exchange_rate);
  };

  const adornment = (
    <IconButton
      color="primary"
      size="small"
      edge="end"
      onClick={() => showDialog(<CurrencyModal />, 'sm')}
    >
      <Iconify icon="icon-park-outline:plus" />
    </IconButton>
  );

  return (
    <ControlledAutocomplete
      control={control}
      name="currency"
      options={options}
      label="Monedas"
      requiredMessage="Debe seleccionar una moneda"
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};

export default CurrencyAutocomplete;
