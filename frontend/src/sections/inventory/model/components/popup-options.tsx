import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useQueryClient } from '@tanstack/react-query';

import { ModelList } from '../../../../types/inventory/model';

import { deleteModel } from '../../../../api/inventory/model';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { useAlert } from '../../../../components/alert';

import { useDialogStore } from '../../../../components/dialog';

import { SvgIcon } from '../../../../components/svg-color';
import ModelFormDialog from './model-form-dialog';

const PopupOptions = ({
  data,
}: {
  data: ModelList;
}) => {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const { showAlert } = useAlert();

  const mutate = useMutateData();

  const queryClient = useQueryClient();

  const showDialog = useDialogStore((state) => state.showDialog);

  const handleDelete = (text: string) => {
    showAlert({
      title: 'Eliminar!',
      content: `¿Esta seguro de eliminar el modelo "${text}" ?`,
      icon: 'solar:trash-bin-minimalistic-bold',
      fn: () =>
        mutate.submit({
          promise: deleteModel(data.id),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['models'] });
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

  const dataModel = {
    id: data.id,
    name: data.name,
    is_active: data.is_active,
    brand: data.brand_id,
    brand_name: data.brand_name
  }

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
        PaperProps={{
          sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' },
        }}
      >
       <MenuItem
          sx={{ color: 'text.secondary', px: '9px' }}
          onClick={() => {showDialog(<ModelFormDialog values={dataModel} />), handleClose()}}
        >
          <SvgIcon icon="ic_edit" width={20} sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(data.name);
            handleClose();
          }}
          sx={{ color: 'error.main', px: '9px' }}
        >
          <SvgIcon icon="ic_trash" width={20} sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions