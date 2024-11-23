import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../../components/iconify';

import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '../../../../../routes/hooks';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../../components/alert';

import { toggleInventoryStatus } from '../../../../../api/inventory/beginning-inventory';

const PopupOptions = ({ id, status, code }: { id: number; status: string; code: string | null }) => {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const showAlert = useAlert((state) => state.showAlert);

  const mutate = useMutateData();

  const queryClient = useQueryClient();

  const toggleStatus = (content: string) => {
    showAlert({
      content: content,
      fn: () =>
        mutate.submit({
          promise: toggleInventoryStatus(id),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchases'] });
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
        <MenuItem onClick={handleClose} sx={{ px: '9px' }}>
          <Iconify icon="ion:eye-sharp" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem>
        {status === 'Borrador' && (
          <>
            <MenuItem
              onClick={() => router.replace(`/purchase/edit/${id}`)}
              sx={{ px: '9px' }}
            >
              <Iconify
                icon="fluent:edit-16-filled"
                width={18}
                sx={{ mr: 1, color: 'text.secondary' }}
              />
              Editar
            </MenuItem>
            <MenuItem
              onClick={() =>
                toggleStatus(`¿Esta seguro de anular la compra "${code}" ?`)
              }
              sx={{ px: '9px', color: 'error.main' }}
            >
              <Iconify icon="material-symbols:no-sim" width={19} sx={{ mr: 1 }} />
              Anular
            </MenuItem>
          </>
        )}
        
        {status === 'ANULADO' && (
          <MenuItem
            onClick={() =>
              toggleStatus(`¿Esta seguro de habilitar la compra "${code}" ?`)
            }
            sx={{ px: '9px', color: 'info.main' }}
          >
            <Iconify icon="ci:check-all" width={19} sx={{ mr: 1 }} />
            Habilitar
          </MenuItem>
        )}
      </Popover>
    </>
  );
};

export default PopupOptions;
