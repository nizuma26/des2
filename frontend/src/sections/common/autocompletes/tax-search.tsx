import { useEffect } from 'react';
//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { FieldValues } from 'react-hook-form';

import { useGetData } from '../../../hooks/use-get-data';
import { useDialogStore } from '../../../components/dialog';

import { TaxSearchProps } from './types';
import { Tax } from '../../../types/configuration/tax';

import { QUERY_KEYS } from '../../configuration/tax/context';

import { PlusIcon } from '../../../components/iconify/default-icons';
import ControlledAutocomplete from '../../../components/controlled/controlled-autocomplete';
import TaxFormDialog from '../../configuration/tax/components/form/tax-form-dialog';
import CustomTooltip from '../../../components/custom-tooltip';


// -----------------------------------------------------------------------

const TaxSearch = <TField extends FieldValues>({
  control,
  name,
  typeTax = 'General',
  onSelected,
  isRequired = false,
  buttonCreate,
  size="medium",
  setValue
}: TaxSearchProps<TField>) => {

  const { data = [], isLoading } = useGetData({
    url: `api/config/tax/?type=${typeTax}`,
    queryKey: [QUERY_KEYS.list, typeTax],
  });

  const options = data.map((i: Tax) => {
    return { value: i.id, label: `${i.name} ${i.tax}%` };
  });

  const showDialog = useDialogStore.getState().showDialog;

  useEffect(() => {
    if (setValue && options.length) {
      setValue("tax", options[0].value)
    } 
  }, [data])

  return (
    <Box width={1} display="flex" alignItems="center" gap={1}>
      <ControlledAutocomplete
        control={control}
        name={name}
        options={options}
        label="Impuesto"
        isRequired={isRequired}
        isLoading={isLoading}
        onSelected={onSelected}
        size={size}
      />
      {buttonCreate && (
        <CustomTooltip title="Crear impuesto">
          <Fab
            variant="circular"
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => showDialog(<TaxFormDialog />)}
            sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: 3 }}
          >
            <PlusIcon />
          </Fab>
        </CustomTooltip>
      )}
    </Box>
  );
};

export default TaxSearch;
