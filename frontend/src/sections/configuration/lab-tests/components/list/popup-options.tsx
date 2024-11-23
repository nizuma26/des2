import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { deleteLaboratory } from '../../../../../api/configuration/laboratory';

import { useQueryClient } from '@tanstack/react-query';
import { useMutateData } from '../../../../../hooks/use-mutate-data';
import { useRouter } from '../../../../../routes/hooks';

import { SvgIcon } from '../../../../../components/svg-color';
import { useAlert } from '../../../../../components/alert';

// --------------------------------------------------------

const PopupOptions = ({
  id,
  name
}: {
  id: number;
  name: string;
}) => {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const { showAlert } = useAlert();

  const router = useRouter();

  const mutate = useMutateData();

  const queryClient = useQueryClient();

  const handleDelete = () => {
    showAlert({
      title: 'Eliminar!',
      content: `¿Esta seguro de eliminar el examen "${name}"?`,
      icon: 'solar:trash-bin-minimalistic-bold',
      fn: () =>
        mutate.submit({
          promise: deleteLaboratory(id),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labs'] });
          },
        }),
    });
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
        <SvgIcon icon="ic_options_vertical" width={20} />
      </IconButton>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: { sx: { padding: '4px', display: 'grid', gap: '4px'} },
        }}
      >        
        <MenuItem onClick={() => router.replace(`/lab-test/edit/${id}`)} sx={{ pr: 7 }}>
          <SvgIcon
            icon="ic_edit"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete()}
          sx={{ color: 'error.main', px: '9px' }}
        >
          <SvgIcon icon="ic_trash" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions