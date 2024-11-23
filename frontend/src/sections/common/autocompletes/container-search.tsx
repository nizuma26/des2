//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';

import { AutocompleteProps } from './types';
import { Container } from '../../../types/configuration/containers';

import { QUERY_KEYS } from '../../configuration/containers/context';

import { PlusIcon } from '../../../components/iconify/default-icons';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import CustomTooltip from '../../../components/custom-tooltip';

// -----------------------------------------------------------------------

const ContainerSearch = <TField extends FieldValues>({
  control,
  name,
  size = 'medium',
  onSelected,
  buttonCreate = true,
  onClickButton = () => {},
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/config/container/?status=true',
    queryKey: [QUERY_KEYS.enabled],
  });

  const options = data.map((c: Container) => {
    return { value: c.id, label: c.name };
  });

  const paddingButton = size === 'small' ? '16px' : '25px';

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Contenedores"
        size={size}
        isRequired={false}
        isLoading={isLoading}
        onSelected={onSelected}
      />
      {buttonCreate && (
        <CustomTooltip title="Crear contenedor">
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

export default ContainerSearch;
