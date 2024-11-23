//@mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';

import { AutocompleteProps } from './types';
import { LabTestCategory } from '../../../types/configuration/lab-test-categories';

import { QUERY_KEYS } from '../../configuration/lab-test-categories/context';

import { SvgIcon } from '../../../components/svg-color';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import CustomTooltip from '../../../components/custom-tooltip';

// -----------------------------------------------------------------------

const LabTestCategorySearch = <TField extends FieldValues>({
  control,
  name,
  size = 'medium',
  onSelected,
  buttonCreate = true,
  onClickButton = () => {},
}: AutocompleteProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: 'api/config/lab-test-category/?status=true',
    queryKey: [QUERY_KEYS.enabled],
  });

  const options = data.map((c: LabTestCategory) => {
    return { value: c.id, label: c.name };
  });

  const paddingButton = size === 'small' ? '10px' : '14px';

  return (
    <Box width={1} display="flex" alignItems="center" gap="6px">
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Categorías"
        size={size}
        isRequired={true}
        isLoading={isLoading}
        onSelected={onSelected}
      />
      {buttonCreate && (
        <CustomTooltip title="Crear categoría">
          <Button
            variant='contained'
            size="small"
            color="inherit"
            aria-label="add"
            sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: paddingButton }}
            onClick={onClickButton}
          >
            <SvgIcon icon='ic_add' />
          </Button>
        </CustomTooltip>
      )}
    </Box>
  );
};

export default LabTestCategorySearch;
