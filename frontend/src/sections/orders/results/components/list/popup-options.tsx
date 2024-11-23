import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { PopupOptionsProps } from '../types';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';

import { deleteData } from '../../../../../api/get-data';

import Iconify from '../../../../../components/iconify';
import { useAlert } from '../../../../../components/alert';
import { QUERY_KEYS } from '../../context';

const PopupOptions = ({ id, code }: PopupOptionsProps) => {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const showAlert = useAlert((state) => state.showAlert);

  const { submit, removeData } = useMutateData();

  const handleCancel = () => {
    showAlert({
      content: `¿Esta seguro de anular la orden "${code}"?`,
      fn: () =>
        submit({
          promise: deleteData(`api/orders/orders/${id}/`),
          onSuccess: () => {
            removeData([QUERY_KEYS.pendingOrders], id);
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
        <Iconify icon="eva:more-vertical-fill" width={20} />
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
        <MenuItem onClick={() => router.replace(`/order/detail/${id}`)} sx={{ px: '9px' }}>
          <Iconify icon="ion:eye-sharp" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem>
        <MenuItem onClick={() => router.replace(`/patient/edit/${id}`)} sx={{ px: '9px' }}>
          <Iconify
            icon="fluent:edit-16-filled"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleCancel} sx={{ px: '9px', color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-minimalistic-bold" width={19} sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
