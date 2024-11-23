import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../../../components/iconify';

//----------------------------------------------------------

export default function PopupOptions() {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

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
          <Iconify icon="majesticons:money-hand" sx={{ color: 'text.secondary', mr: 1 }} />
          Realizar pago
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ px: '9px' }}>
          <Iconify icon="solar:chat-round-money-bold" sx={{ color: 'text.secondary', mr: 1 }} />
          Ver pagos
        </MenuItem>
      </Popover>
    </>
  );
}
