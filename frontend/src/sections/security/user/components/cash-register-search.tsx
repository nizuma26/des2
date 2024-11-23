//@mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { useGetData } from '../../../../hooks/use-get-data';
import { useDialogStore } from '../../../../components/dialog';

import { CashRegisterSearchProps } from './types';
import { CashRegister } from '../../../../types/configuration/cash-register';

import { QUERY_KEYS } from '../context';

import { PlusIcon } from '../../../../components/iconify/default-icons';
import ControlledAutocomplete from '../../../../components/controlled/controlled-autocomplete';
import CashRegisterFormDialog from '../../../configuration/cash-register/components/form/cash-register-form-dialog';
import CustomTooltip from '../../../../components/custom-tooltip';
import { useWatch } from 'react-hook-form';

// -----------------------------------------------------------------------

const CashRegisterSearch = ({ control, userId }: CashRegisterSearchProps) => {

  const laboratoryId = useWatch({
    name: 'laboratory',
    control
  });

  const { data = [], isLoading } = useGetData({
    url: `api/users/user/cash-registers/?user_id=${userId}&lab_id=${laboratoryId}`,
    queryKey: [QUERY_KEYS.cashRegisters, laboratoryId],
    enabled: !!laboratoryId,
    staleTime: 10,
  });

  const options = data.map((i: CashRegister) => {
    return { value: i.id, label: i.name };
  });

  const showDialog = useDialogStore.getState().showDialog;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ControlledAutocomplete
        control={control}
        name="cash_register"
        options={options}
        label="Asignar caja"
        isRequired={false}
        isLoading={isLoading}
      />
      <CustomTooltip title="Crear caja">
        <Fab
          variant="circular"
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => showDialog(<CashRegisterFormDialog />)}
          sx={{ color: '#fff', borderRadius: '9px', boxShadow: 'inherit', p: 3 }}
        >
          <PlusIcon />
        </Fab>
      </CustomTooltip>
    </Box>
  );
};

export default CashRegisterSearch;
