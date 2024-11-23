import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../../components/iconify';

import { useRouter } from '../../../../../routes/hooks';
import { useAlert } from '../../../../../components/alert';

const PopupOptions = ({ id, status, code }: { id: number; status: string; code: string | null }) => {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const showAlert = useAlert((state) => state.showAlert);

  const toggleStatus = (content: string) => {
    showAlert({
      title: "",
      content: content,
      fn: () => {}       
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

  const isEditable = status === 'Borrador' || status === 'Devuelto'
  
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
        {status === "Aprobado" && (
          <MenuItem
          onClick={() => router.push(`/purchase-requisition/generate/${id}`)}
          sx={{ px: '9px' }}
        >
          <Iconify
            icon="fluent:edit-16-filled"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Generar Orden
        </MenuItem>
        )}
        {isEditable && (
          <>
            <MenuItem
              onClick={() => router.replace(`/purchase-requisition/edit/${id}`)}
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
                toggleStatus(`¿Esta seguro de anular la requisición "${code}" ?`)
              }
              sx={{ px: '9px', color: 'error.main' }}
            >
              <Iconify icon="material-symbols:no-sim" width={19} sx={{ mr: 1 }} />
              Anular
            </MenuItem>
          </>
        )}
        
        {status === 'Anulada' && (
          <MenuItem
            onClick={() =>
              toggleStatus(`¿Esta seguro de habilitar la requisición "${code}" ?`)
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
