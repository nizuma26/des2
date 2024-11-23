import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Affiliation } from '../../../../../types/orders/affiliations';

import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../../components/alert';
import { useDialogStore } from '../../../../../components/dialog';

import { QUERY_KEYS } from '../../context';

import Iconify from '../../../../../components/iconify';
import AffiliationDialogForm from '../form/affiliation-dialog-form';
import { deleteData } from '../../../../../api/get-data';

const PopupOptions = ({ data }: { data: Affiliation }) => {
  
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const showAlert = useAlert((state) => state.showAlert);

  const { submit, removeData } = useMutateData();

  const showDialog = useDialogStore((state) => state.showDialog);

  const handleShowDialog = () => {
    showDialog(<AffiliationDialogForm values={data} />, "sm");
    handleClose();
  };

  const handleDelete = () => {
    showAlert({
      content: `¿Esta seguro de eliminar la afiliación "${data.name}" ?`,
      fn: () =>
        submit({
          promise: deleteData(`api/orders/affiliation/${data.id}/`),
          onSuccess: () => {
            if (data.id) removeData([QUERY_KEYS.list], data.id);
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
        <MenuItem onClick={handleShowDialog} sx={{ color: 'text.secondary', px: '9px' }}>
          <Iconify icon="fluent:edit-16-filled" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main', px: '9px' }}>
          <Iconify icon="solar:trash-bin-minimalistic-bold" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
