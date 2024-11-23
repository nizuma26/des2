import { useState, MouseEvent, ReactNode } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';

import Iconify from '../iconify';

interface PopupProps {
  children: ReactNode;
  btnShow?: ReactNode;
}

export default function Popup({ children, btnShow }: PopupProps) {

  const [isOpen, setIsOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsOpen(null);
  };

  const isOpenOptions = Boolean(isOpen);

  return (
    <>
    {btnShow 
    ? ( <div onClick={handleOpenMenu}>{btnShow}</div> ) 
    : (
        <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" width={20} />
        </IconButton>
    )}
    
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' },
        }}
      >
            {children}
      </Popover>
    </>
  );
}
