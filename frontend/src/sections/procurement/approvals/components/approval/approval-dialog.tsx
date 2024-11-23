import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useFormContext } from 'react-hook-form';

import useDialogStore from '../../../../../components/dialog/use-dialog';

import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';

interface ApprovalDialogProps {
  title: string;
  icon: string;
  loading: boolean;
}

//---------------------------------------------------------

export default function ApprovalDialog({ title, icon, loading }: ApprovalDialogProps) {
  const { register } = useFormContext();

  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <>
      <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
        <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
          <Iconify icon={icon} width={22} sx={{ opacity: 0.86 }} />
        </Label>
        {title} requisición
      </DialogTitle>
      <DialogContent>
        <Box py={2}>
          <TextField
            margin="dense"
            multiline
            fullWidth
            rows={3}
            label="Comentario"
            {...register('comment')}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="inherit"
          loading={loading}
          form="approval-form"
        >
          Guardar
        </LoadingButton>
        <Button variant="outlined" onClick={closeDialog}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}
