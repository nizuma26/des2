//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';

import { AutocompleteProps } from './types';
import { Bank } from '../../../types/configuration/banks';

import { QUERY_KEYS } from '../../configuration/banks/context';

import { PlusIcon } from '../../../components/iconify/default-icons';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import CustomTooltip from '../../../components/custom-tooltip';

// -----------------------------------------------------------------------

interface BankSearchProps <TField extends FieldValues> extends AutocompleteProps<TField> {
  valueOptions?: "id" | "name"
}

const BankSearch = <TField extends FieldValues>({
  control,
  name,
  size="medium",
  onSelected,
  valueOptions="id",
  buttonCreate=false
}: BankSearchProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/config/bank/',
    queryKey: [QUERY_KEYS.list],
  });

  const options = data.map((i: Bank) => {
    return { value: i[valueOptions], label: i.name };
  });

  const paddingButton = size === 'small' ? "16px" : "25px"

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Banco"
        size={size}
        isRequired={false}
        isLoading={isLoading}
        onSelected={onSelected}
      />
      {buttonCreate && (
        <CustomTooltip title="Crear banco">
          <Fab
            variant="circular"
            size="small"
            color="primary"
            aria-label="add"
            sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: paddingButton }}
          >
            <PlusIcon />
          </Fab>
        </CustomTooltip>
      )}
    </Box>
  );
};

export default BankSearch;
