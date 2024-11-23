import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../../components/iconify';

interface PopupOptionsProps {
  removeItem: () => void;
  updateItem: () => void;
}

const PopupOptions = ({ removeItem, updateItem }: PopupOptionsProps) => {
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
      <IconButton onClick={handleOpen} color='primary' sx={{mr:-2}}>
        <Iconify icon="eva:more-vertical-fill" width={20} />
      </IconButton>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, padding: '2px', display: 'grid', gap: '4px' },
        }}
      >
        <MenuItem onClick={() => {updateItem(), handleClose()}} sx={{ px: '9px' }}>
          <Iconify icon="fluent:edit-16-filled" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={removeItem} sx={{ px: '9px', color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-minimalistic-bold" width={19} sx={{mr: 1 }} />
          Remover
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
