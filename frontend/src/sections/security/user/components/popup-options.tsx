import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';

import { deleteUser } from '../../../../api/security/user';

import { useQueryClient } from '@tanstack/react-query';
import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../routes/hooks';

import { useAlert } from '../../../../components/alert';

// ----------------------------------------------------------------------

interface PopupOptionsProps {
  id: number;
  user: string;
}

export default function PopupOptions({
  id,
  user,
}: PopupOptionsProps) {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const { showAlert } = useAlert();
  
  const router = useRouter();

  const mutate = useMutateData();

  const queryClient = useQueryClient();

  const handleDelete = () => {
    showAlert({
      content: `¿Esta seguro de eliminar al usuario "${user}" ?`,
      icon: 'solar:trash-bin-minimalistic-bold',
      fn: () =>
        mutate.submit({
          promise: deleteUser(id),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labs'] });
          },
        }),
    });
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
        slotProps={{
          paper: { sx: { width: 140, padding: '4px', display: 'grid', gap: '4px'} },
        }}
      >        
        <MenuItem onClick={() => router.replace(`/user/edit/${id}`)} sx={{ px: '9px' }}>
          <Iconify
            icon="fluent:edit-16-filled"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ px: '9px' }}>
          <Iconify icon="ion:eye-sharp" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem>
        <MenuItem
          onClick={() => {handleDelete(), handleClose()}}
          sx={{ color: 'error.main', px: '9px' }}
        >
          <Iconify icon="solar:trash-bin-minimalistic-bold" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
}
