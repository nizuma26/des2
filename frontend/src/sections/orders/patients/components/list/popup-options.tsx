import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { PopupOptionsProps } from '../types';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { deleteData } from '../../../../../api/get-data';
import { useAlert } from '../../../../../components/alert';
import { QUERY_KEYS } from '../../context';

import ProtectedContent from '../../../../../auth/components/protected-content';
import { SvgIcon } from '../../../../../components/svg-color';

const PopupOptions = ({ id, patient }: PopupOptionsProps) => {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const showAlert = useAlert((state) => state.showAlert);

  const { submit, removeData } = useMutateData();

  const handleDelete = () => {
    showAlert({
      content: `¿Esta seguro de eliminar al paciente "${patient}"?`,
      fn: () =>
        submit({
          promise: deleteData(`api/orders/patient/${id}/`),
          onSuccess: () => {
            removeData([QUERY_KEYS.list], id);
          },
        }),
    });
    handleClose();
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const isOpenOptions = Boolean(isOpen);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <SvgIcon icon="ic_options_vertical" width={20} />
      </IconButton>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' },
        }}
      >
        <ProtectedContent perms={['change_patient']}>
          <MenuItem onClick={() => router.replace(`/patient/edit/${id}`)} sx={{ px: '9px' }}>
            <SvgIcon
              icon="ic_edit"
              width={18}
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            Editar
          </MenuItem>
        </ProtectedContent>
        <ProtectedContent perms={['delete_patient']}>
          <MenuItem onClick={handleDelete} sx={{ px: '9px', color: 'error.main' }}>
            <SvgIcon icon="id_trash" width={19} sx={{ mr: 1 }} />
            Eliminar
          </MenuItem>
        </ProtectedContent>
      </Popover>
    </>
  );
};

export default PopupOptions;
