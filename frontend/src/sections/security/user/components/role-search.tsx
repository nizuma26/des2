//@mui
import Box from '@mui/material/Box';

import { FieldValues } from 'react-hook-form';

import { AutocompleteProps } from 'src/sections/common/autocompletes/types';
import { RoleList } from 'src/types/security/role';

import { useGetData } from '../../../../hooks/use-get-data';

import { QUERY_KEYS } from '../context';

import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';

// -----------------------------------------------------------------------

const RoleSearch = <TField extends FieldValues>({
  control,
  name,
  size = 'medium',
  onSelected,
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/users/role/',
    queryKey: [QUERY_KEYS.roles],
  });

  const options = data.map((i: RoleList) => {
    return { value: i.id, label: i.name };
  });

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Rol de usuario"
        size={size}
        isRequired={false}
        isLoading={isLoading}
        onSelected={onSelected}
      />
    </Box>
  );
};

export default RoleSearch;
