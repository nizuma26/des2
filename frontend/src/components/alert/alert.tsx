import { memo } from 'react';
//@mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { alpha } from '@mui/material/styles';

import { useAlert } from './useAlert';

import Label from '../label';
import Iconify from '../iconify';

const AlertDialog = memo(function AlertDialog() {

  const { isOpen, title, content, icon, fn, closeAlert } = useAlert();

  const onConfirm = () => {
    fn && fn();
    closeAlert();
  };

  return (
    <>
      <Dialog
        open={!!isOpen}
        onClose={closeAlert}
        fullWidth
        maxWidth="xs"
        sx={{
          '& .MuiDialog-paper': {
            p: '0.5rem 1rem 1.2rem 0rem',
          },
        }}
      >
        <DialogTitle display="flex" alignItems="center" gap={1} mb={2} typography="subtitle2">
          <Label color="primary" sx={{ borderRadius: '50%', py: '20px', px: '10px' }}>
            <Iconify icon={icon ? icon : 'mingcute:alert-fill'} width={22} sx={{ opacity: 0.86 }} />
          </Label>{' '}
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ typography: 'body2' }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="inherit" onClick={onConfirm}>
              Aceptar
            </Button>
          <Button
            sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}
            onClick={closeAlert}
            autoFocus
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default AlertDialog;
