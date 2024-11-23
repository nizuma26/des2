//@mui
import IconButton from '@mui/material/IconButton';

import { FieldValues } from 'react-hook-form';

import { AutocompleteProps } from '../../../common/autocompletes/types';
import { GenericValues } from '../../../../types';

import { useGetData } from '../../../../hooks/use-get-data';
import { useDialogStore } from '../../../../components/dialog';

import { QUERY_KEYS } from '../../brand/context';

import Iconify from '../../../../components/iconify';
import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';

import BrandFormDialog from '../../brand/components/brand-form-dialog';

//------------------------------------------------------------------------------------

const BrandAutocomplete = <TField extends FieldValues>({
  control,
  name,
  isRequired = true,
  onSelected,
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/inventory/brand/',
    queryKey: [QUERY_KEYS.list],
  });

  const options = data.map((i: GenericValues) => {
    return { value: i.id, label: i.name };
  });

  const showDialog = useDialogStore.getState().showDialog;

  const adornment = (
    <IconButton
      color="primary"
      size="small"
      edge="end"
      onClick={() =>
        showDialog(
          <BrandFormDialog />
        )
      }
    >
      <Iconify icon="icon-park-outline:plus" />
    </IconButton>
  );

  return (
    <ControlledAutocomplete
      control={control}
      name={name}
      options={options}
      label="Marcas"
      isRequired={isRequired}
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};

export default BrandAutocomplete;
