import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { bgGradient2 } from '../../../../theme/css';

import { useDialogStore } from '../../../../components/dialog';

import { BaseModalProps } from '../../../../types';

import { SvgIcon } from '../../../../components/svg-color';
import IconButton from '@mui/material/IconButton';
import AccountsPayableTable from './accounts-payable-table';

interface PaymentModalFormProps extends BaseModalProps {
  supplierId: number;
  totalDebt: number;
  supplierName: string;
}

export default function AccountsPayableDialog({
  supplierId,
  totalDebt,
  supplierName,
  onClose = () => {},
}: PaymentModalFormProps) {
  const {
    palette: { primary },
  } = useTheme();

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const handleClose = () => {
    closeDialog();
    onClose && onClose();
  };

  const bgGradientPrimary = bgGradient2({
    direction: '135deg',
    startColor: primary.dark,
    endColor: primary.main,
  });

  return (
    <>
      <AppBar
        sx={{
          position: 'relative',
          boxShadow: 'inherit',
          color: '#fff',
          ...bgGradientPrimary,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon icon="ic_close" />
          </IconButton>
          <Typography ml={2} variant="h6" component="div">
            Cuentas por pagar:
          </Typography>
          <Typography variant="subtitle2" ml={2}>
            {supplierName}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ px: 0, py: 0 }}>
        <AccountsPayableTable
          supplierId={supplierId}
          toolbarSx={{ bgcolor: 'background.neutral', color: 'text.secondary', minHeight: 36 }}
        />
      </DialogContent>
    </>
  );
}
