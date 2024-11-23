import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { PopupOptionsProps } from '../types';

import { useDialogStore } from '../../../../../components/dialog';

import CurrencyFormDialog from '../form/currency-form-dialog';
import { SvgIcon } from '../../../../../components/svg-color';

// -------------------------------------------------------------------

const PopupOptions = ({ data }: PopupOptionsProps) => {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const showDialog = useDialogStore((state) => state.showDialog);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleShowDialog = () => {
    showDialog(<CurrencyFormDialog values={data} />, 'sm');
    handleClose();
  };

  const isOpenOptions = Boolean(isOpen);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <SvgIcon icon="ic_options_vertical" width={22} />
      </IconButton>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: { sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' } },
        }}
      >
        <MenuItem sx={{ px: '9px', gap: 2 }} onClick={handleShowDialog} dense>
          <SvgIcon icon="ic_edit" width={20} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'error.main', px: '9px', gap: 2 }} dense>
          <SvgIcon icon="ic_trash" width={20} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
