import { useState, MouseEvent } from 'react';
//@mui
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


import { GenericValues } from '../../../../types';

import { deleteMeasureUnit } from '../../../../api/inventory/measure-unit';

import { useMutateData } from '../../../../hooks/use-mutate-data';
import { useAlert } from '../../../../components/alert';
import { useDialogStore } from '../../../../components/dialog';

import { SvgIcon } from '../../../../components/svg-color';
import MeasureUnitFormDialog from './measure-unit-form-dialog';

const PopupOptions = ({ data }: { data: GenericValues }) => {
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const showAlert = useAlert((state) => state.showAlert);

  const showDialog = useDialogStore((state) => state.showDialog);

  const handleOpenPopup = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  };

  const handleClosePopup = () => {
    setIsOpen(null);
  };

  const handleShowDialog = () => {
    handleClosePopup();
    showDialog(<MeasureUnitFormDialog values={data} />, 'xs');
  };

  const { submit, removeData } = useMutateData();

  const handleDelete = () => {
    handleClosePopup();
    showAlert({
      content: `¿Esta seguro de eliminar la unidad de medida "${data.name}" ?`,
      fn: () =>
        submit({
          promise: deleteMeasureUnit(data.id),
          onSuccess: () => {
            data.id !== undefined && removeData(['measure-units'], data.id);
          },
        }),
    });
  };

  const isOpenOptions = Boolean(isOpen);

  return (
    <>
      <IconButton onClick={handleOpenPopup}>
        <SvgIcon icon="ic_options_vertical" width={22} />
      </IconButton>
      <Popover
        open={!!isOpenOptions}
        anchorEl={isOpen}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' },
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
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main', px: '9px' }}>
          <SvgIcon icon="ic_trash" width={20} sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};

export default PopupOptions;
