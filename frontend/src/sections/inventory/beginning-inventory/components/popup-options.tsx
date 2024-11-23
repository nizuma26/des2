import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useQueryClient } from '@tanstack/react-query';

import { useRouter } from '../../../../routes/hooks';
import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../components/alert';

import { toggleInventoryStatus } from '../../../../api/inventory/beginning-inventory';

import { SvgIcon } from '../../../../components/svg-color';

const PopupOptions = ({ id, status, code }: { id: number; status: string; code: string }) => {
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
            queryClient.invalidateQueries({ queryKey: ['beginning-inventory'] });
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
      {status !== 'Finalizado' && (
        <Popover
          open={!!isOpenOptions}
          anchorEl={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { padding: '4px', display: 'grid', gap: '4px' },
          }}
        >
          {status === 'En proceso' && (
            <>
              <MenuItem
                onClick={() => router.replace(`/beginning-inventory/edit/${id}`)}
                sx={{ pr: 7 }}
              >
                <SvgIcon icon="ic_edit" width={18} sx={{ color: 'text.secondary' }} />
                Editar
              </MenuItem>
              <MenuItem
                onClick={() =>
                  toggleStatus(`¿Esta seguro de anular el inventario inicial "${code}" ?`)
                }
                sx={{ px: '9px', color: 'error.main' }}
              >
                <SvgIcon icon="ic_disabled" width={19} sx={{ mr: 1 }} />
                Anular
              </MenuItem>
            </>
          )}

          {status === 'Anulado' && (
            <MenuItem
              onClick={() =>
                toggleStatus(`¿Esta seguro de habilitar el inventario inicial "${code}" ?`)
              }
              sx={{ px: '9px', color: 'info.main' }}
            >
              <SvgIcon icon="ic_check" width={19} sx={{ mr: 1 }} />
              Habilitar
            </MenuItem>
          )}
        </Popover>
      )}
    </>
  );
};

export default PopupOptions;
