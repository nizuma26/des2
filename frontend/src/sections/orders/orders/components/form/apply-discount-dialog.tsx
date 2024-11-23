import { useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { ApplyDiscountDialogProps } from './types';

import { SvgIcon } from '../../../../../components/svg-color';
import Label from '../../../../../components/label';
import { useDialogStore } from '../../../../../components/dialog';

//---------------------------------------------------------

export default function ApplyDiscountDialog({ applyDiscount, selected, setCheckAll }: ApplyDiscountDialogProps) {

  const [discount, setApplyDiscount] = useState<number>(0);

  const closeDialog = useDialogStore(state => state.closeDialog);

  const handleClose = () => closeDialog();

  const apply = () => {
    const validateDiscount = discount ?? 0;
    applyDiscount(validateDiscount, selected, setCheckAll);
    handleClose()
  };

  return (
    <>
        <DialogTitle display="flex" alignItems="center" gap={1} typography="subtitle2">
          <Box width={1} display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
            <Label color="primary" sx={{ borderRadius: '30%', py: '20px', px: '10px' }}>
              <SvgIcon icon="ic_percent_circle" />
            </Label>
            <Typography>Agregar comentario</Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <SvgIcon icon="mingcute:close-fill" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: 1 }}>
          <Box width={1} py={2}>
            <TextField
              defaultValue={discount}
              type='number'
              margin="dense"
              fullWidth
              label="Descuento"
              onChange={(e) => setApplyDiscount(Number(e?.target?.value))}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color='inherit'
            onClick={apply}
            startIcon={<SvgIcon icon="ic_check" />}
          >
            Aplicar
          </Button>
        </DialogActions>
    </>
  );
}
