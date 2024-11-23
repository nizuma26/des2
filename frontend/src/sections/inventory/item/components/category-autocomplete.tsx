//@mui
import IconButton from '@mui/material/IconButton';

import { FieldValues } from 'react-hook-form';

import { AutocompleteProps } from '../../../common/autocompletes/types';
import { GenericValues } from '../../../../types';

import { useGetData } from '../../../../hooks/use-get-data';
import { useDialogStore } from '../../../../components/dialog';

import { QUERY_KEYS } from '../../category/context'

import { SvgIcon } from '../../../../components/svg-color';
import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';
import CategoryFormDialog from '../../category/components/category-form-dialog';

//------------------------------------------------------------------------------------

export default function CategoryAutocomplete <TField extends FieldValues>({
  control,
  name,
  isRequired = false,
  onSelected,
}: AutocompleteProps<TField>) {

  const { data = [], isLoading } = useGetData({
    url: 'api/inventory/category/',
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
          <CategoryFormDialog />
        )
      }
    >
      <SvgIcon icon="ic_add" />
    </IconButton>
  );

  return (
    <ControlledAutocomplete
      control={control}
      name={name}
      options={options}
      label="Categorías"
      isRequired={isRequired}
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};
