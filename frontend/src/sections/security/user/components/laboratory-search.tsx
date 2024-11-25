//@mui
import Box from '@mui/material/Box';

import { FieldValues } from 'react-hook-form';

import { AutocompleteProps } from 'src/sections/common/autocompletes/types';
import { LaboratoryList } from 'src/types/configuration/laboratory';

import { useGetData } from '../../../../hooks/use-get-data';

import { QUERY_KEYS } from '../context';

import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';

// -----------------------------------------------------------------------

const LaboratorySearch = <TField extends FieldValues>({
  control,
  name,
  size = 'medium',
  onSelected,
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/config/laboratory/',
    queryKey: [QUERY_KEYS.laboratories],
  });

  const options = data.map((i: LaboratoryList) => {
    return { value: i.id, label: i.name };
  });

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Laboratorio"
        size={size}
        isRequired={false}
        isLoading={isLoading}
        onSelected={onSelected}
      />
    </Box>
  );
};

export default LaboratorySearch;
