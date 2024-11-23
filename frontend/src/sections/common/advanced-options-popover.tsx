import { useState, MouseEvent } from 'react';
//@mui
import Stack from '@mui/material/Stack';
import CustomTooltip from '../../components/custom-tooltip';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../components/iconify';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

//-----------------------------------------------------

interface Options {
  label: string;
  icon: string;
  fn: () => void;
}

interface AdvancedOptionsPopoverProps {
  options: Options[];
}

export default function AdvancedOptionsPopover({ options }: AdvancedOptionsPopoverProps) {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClosePopover = () => {
    setIsOpen(null);
  };

  const isOpenOptions = Boolean(isOpen);

  return (
    <>
      <Stack width={1} direction="row" justifyContent="flex-end">
        <CustomTooltip title="Opciones avanzada">
          <IconButton sx={{ height: 40, width: 40 }} onClick={handleOpenPopover}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </CustomTooltip>
      </Stack>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: { 
            sx: {
              width: 150,
              padding: '4px',
              display: 'grid',
              gap: '4px',
            },
          },
        }}
      >
        {options.map((option, index) => {
          const callback = () => {
            option.fn();
            handleClosePopover();
          };
          return (
            <MenuItem key={index} onClick={callback} sx={{ color: 'text.secondary', px: '9px' }}>
              <Iconify icon={option.icon} sx={{ mr: 1 }} />
              {option.label}
            </MenuItem>
          );
        })}
      </Popover>
    </>
  );
}
