import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import ItemDatatableDialog from './item-datatable-dialog';

import { SearchIcon } from '../../../../components/iconify/default-icons';

import { ItemDatatableDialogProps } from './types';

export default function ShowDialog({ itemIds, onSelected }: ItemDatatableDialogProps) {
    
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant='contained'
        size="small"
        color="inherit"
        aria-label="add"
        onClick={handleOpen}
        sx={{ borderRadius: '10px', py: '16px' }}
      >
        <SearchIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <ItemDatatableDialog itemIds={itemIds} onSelected={onSelected} onClose={handleClose} />
      </Dialog>
    </>
  );
}
