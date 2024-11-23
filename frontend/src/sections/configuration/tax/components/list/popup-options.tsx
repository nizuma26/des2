import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { PopupOptionsProps } from './types';

import { useDialogStore } from '../../../../../components/dialog';

import { SvgIcon } from '../../../../../components/svg-color';
import TaxFormDialog from '../form/tax-form-dialog';

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
    showDialog(<TaxFormDialog values={data} />);
    handleClose();
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
        slotProps={{
          paper: { sx: { padding: '4px', display: 'grid', gap: '4px' } },
        }}
      >
        <MenuItem sx={{ pr: 7, gap: 1 }} onClick={handleShowDialog}>
          <SvgIcon
            icon="ic_edit"
            width={18}
            sx={{ color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'error.main', gap: 1 }}>
          <SvgIcon icon="ic_trash" />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
