//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';

import { AutocompleteProps } from './types';
import { Sample } from '../../../types/configuration/samples';

import { QUERY_KEYS } from '../../configuration/samples/context';

import { PlusIcon } from '../../../components/iconify/default-icons';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import CustomTooltip from '../../../components/custom-tooltip';

// -----------------------------------------------------------------------

const SampleSearch = <TField extends FieldValues>({
  control,
  name,
  size = 'medium',
  onSelected,
  buttonCreate = true,
  onClickButton = () => {},
}: AutocompleteProps<TField>) => {
  
  const { data = [], isLoading } = useGetData({
    url: 'api/config/sample/?status=true',
    queryKey: [QUERY_KEYS.enabled],
  });

  const options = data.map((s: Sample) => {
    return { value: s.id, label: s.name };
  });

  const paddingButton = size === 'small' ? '16px' : '25px';

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Tipos de muestras"
        size={size}
        isRequired={false}
        isLoading={isLoading}
        onSelected={onSelected}
      />
      {buttonCreate && (
        <CustomTooltip title="Crear muestra">
          <Fab
            variant="circular"
            size="small"
            color="primary"
            aria-label="add"
            sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: paddingButton }}
            onClick={onClickButton}
          >
            <PlusIcon />
          </Fab>
        </CustomTooltip>
      )}
    </Box>
  );
};

export default SampleSearch;
