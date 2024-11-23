import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


import { useQueryClient } from '@tanstack/react-query';

import { deleteBrand } from '../../../../api/inventory/brand';

import { GenericValues } from '../../../../types';

import { useMutateData } from '../../../../hooks/use-mutate-data';

import { useAlert } from '../../../../components/alert';
import { useDialogStore } from '../../../../components/dialog';

import { SvgIcon } from '../../../../components/svg-color';
import BrandFormDialog from './brand-form-dialog';

const PopupOptions = ({
  data,
}: {
  data: GenericValues;
}) => {

  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const showDialog = useDialogStore((state) => state.showDialog);

  const { showAlert } = useAlert();

  const mutate = useMutateData();

  const queryClient = useQueryClient();

  const handleDelete = (text: string, id?: number) => {
    showAlert({
      title: 'Eliminar!',
      content: `¿Esta seguro de eliminar la marca "${text}" ?`,
      icon: 'solar:trash-bin-minimalistic-bold',
      fn: () =>
        mutate.submit({
          promise: deleteBrand(id),
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

  const handleShowDialog = () => {
    showDialog(<BrandFormDialog values={data} />);
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
          paper: { sx: { padding: '4px', display: 'grid', gap: '4px'} },
        }}
      >
        <MenuItem sx={{ pr: 7 }} onClick={handleShowDialog}>
          <SvgIcon
            icon="ic_edit"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(data.name, data.id);
            handleClose();
          }}
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