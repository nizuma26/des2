//@mui
import IconButton from '@mui/material/IconButton';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';
import { useDialogStore } from '../../../components/dialog';

import { AutocompleteProps } from './types';
import { GenericValues } from '../../../types';

import { SvgIcon } from '../../../components/svg-color';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import MeasureUnitFormDialog from '../../inventory/measure_unit/components/measure-unit-form-dialog';

const MeasureUnitAutocomplete = <TField extends FieldValues>({
  control,
  name,
  onSelected
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/inventory/measure_unit/',
    queryKey: ['measure-units'],
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
          <MeasureUnitFormDialog />
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
      label="Unidades de medida"
      requiredMessage="Debe seleccionar una unidad de medida"
      isLoading={isLoading}
      adornment={adornment}
      onSelected={onSelected}
    />
  );
};

export default MeasureUnitAutocomplete;
