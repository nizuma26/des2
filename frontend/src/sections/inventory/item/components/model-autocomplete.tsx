//@mui
import IconButton from '@mui/material/IconButton';

import { FieldValues } from 'react-hook-form';

import { AutocompleteProps } from '../../../common/autocompletes/types';
import { ModelList } from '../../../../types/inventory/model';

import { useGetData } from '../../../../hooks/use-get-data';
import { useDialogStore } from '../../../../components/dialog';

import { QUERY_KEYS } from '../../model/context'

import { SvgIcon } from '../../../../components/svg-color';
import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';
import ModelFormDialog from '../../model/components/model-form-dialog';

//------------------------------------------------------------------------------------

export default function ModelAutocomplete <TField extends FieldValues>({
  control,
  name,
  isRequired = false,
  onSelected,
}: AutocompleteProps<TField>) {

  const { data = [], isLoading } = useGetData({
    url: 'api/inventory/model/',
    queryKey: [QUERY_KEYS.list],
  });
  
  const options = data.map((i: ModelList) => {
    return { value: i.id, label: i.name + '/' + i.brand_name };
  });
  const showDialog = useDialogStore.getState().showDialog;

  const adornment = (
    <IconButton
      color="primary"
      size="small"
      edge="end"
      onClick={() =>
        showDialog(
          <ModelFormDialog/>
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
      label="Modelos"
      isRequired={isRequired}
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};
