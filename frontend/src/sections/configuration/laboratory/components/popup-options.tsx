import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useRouter } from '../../../../routes/hooks';

import { SvgIcon } from '../../../../components/svg-color';

// ------------------------------------------------------------------------

const PopupOptions = ({
  id,
}: {
  id: number;
}) => {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

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
        slotProps={{
          paper: { sx: { width: 140, padding: '4px', display: 'grid', gap: '4px'} },
        }}
      >        
        <MenuItem onClick={() => router.replace(`/laboratory/edit/${id}`)} sx={{ px: '9px' }}>
          <SvgIcon
            icon="ic_edit"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        {/* <MenuItem onClick={handleClose} sx={{ px: '9px' }}>
          <SvgIcon icon="ic_edi" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem> */}
      </Popover>
    </>
  );
};

export default PopupOptions