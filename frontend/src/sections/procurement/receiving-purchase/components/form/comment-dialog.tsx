import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { CommentDialogProps } from './types';

import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';
import CustomTooltip from '../../../../../components/custom-tooltip';

//---------------------------------------------------------

export default function CommentDialog({ addComment, value }: CommentDialogProps) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState<string | null>(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const accept = () => {
    const validateComment = comment ?? '';
    addComment(validateComment);
    handleClose()
  };

  return (
    <>
      <CustomTooltip title="Agregar comentario" placement="top">
        <IconButton onClick={handleOpen}>
          <Iconify icon="mynaui:message-dots-solid" />
        </IconButton>
      </CustomTooltip>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
          <Box width={1} display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
            <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
              <Iconify icon="mynaui:message-dots-solid" />
            </Label>
            <Typography>Agregar comentario</Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <Iconify icon="mingcute:close-fill" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: 1 }}>
          <Box width={1} py={2}>
            <TextField
              defaultValue={comment}
              margin="dense"
              multiline
              fullWidth
              maxRows={2}
              label="Comentario"
              onChange={(e) => setComment(e?.target?.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color='inherit'
            onClick={accept}
            startIcon={<Iconify icon="solar:check-read-linear" />}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
