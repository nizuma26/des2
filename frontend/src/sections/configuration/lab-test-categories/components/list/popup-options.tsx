import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { PopupOptionsProps } from './types';

import { moveToTrash } from '../../../../../api/get-data';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../../components/alert';
import { useDialogStore } from '../../../../../components/dialog';

import { QUERY_KEYS } from '../../context';

import { SvgIcon } from '../../../../../components/svg-color';
import LabTestCategoryFormDialog from '../form/lab-test-category-form-dialog';

// ---------------------------------------------------------------------

const PopupOptions = ({ data }: PopupOptionsProps) => {
  
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const showAlert = useAlert((state) => state.showAlert);
  const showDialog = useDialogStore((state) => state.showDialog);
  const { submit, removeData } = useMutateData();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleShowDialog = () => {
    showDialog(<LabTestCategoryFormDialog values={data} />);
    handleClose();
  };

  const handleRemove = () => {
    const id = data?.id ? [data.id] : []
    showAlert({
      content: `¿Esta seguro de mover la categoría "${data.name}" a la papelera?`,
      fn: () =>
        submit({
          promise: moveToTrash('api/config/lab-test-category', id),
          onSuccess: () => {
            if (data.id) removeData([QUERY_KEYS.enabled], data.id);
          },
        }),
    });
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
        <MenuItem sx={{ px: '9px' }} onClick={handleShowDialog}>
          <SvgIcon
            icon="ic_edit"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleRemove} sx={{ color: 'error.main', px: '9px' }}>
          <SvgIcon icon="ic_trash" sx={{ mr: 1 }} />
          Remover
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
