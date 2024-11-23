import { useState, MouseEvent, ChangeEvent } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { AlertDialog, useAlert } from '../../components/alert';
// ----------------------------------------------------------------------

interface InvoiceTableRowProps {
  id: number;
  selected: boolean;
  code: string;
  patient: string;
  date: string;
  status: string;
  total: string;
  handleClick: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  dense: boolean;
}

export default function InvoiceTableRow({
  id,
  selected,
  code,
  patient,
  date,
  status,
  total,
  handleClick,
  dense,
}: InvoiceTableRowProps) {
  const [openOptions, setOpenOptions] = useState<HTMLButtonElement | null>(null);

  const { alert, showAlert, onClose } = useAlert();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setOpenOptions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenOptions(null);
  };

  const isOpenOptions = Boolean(openOptions);

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        style={{
          height: dense ? 53 : 53,
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleClick(event, id)}
          />
        </TableCell>

        <TableCell>
          <ListItemText>
            <Typography variant="subtitle2">{patient}</Typography>
            <Typography variant="body2" color="text.disabled">
              {code}
            </Typography>
          </ListItemText>
        </TableCell>

        <TableCell>{date}</TableCell>

        <TableCell>{total}</TableCell>

        <TableCell align="center">
          <Label
            color={
              (status === 'Pagado' && 'success') || (status === 'Pendiente' && 'warning') || 'error'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" width={20} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!isOpenOptions}
        anchorEl={openOptions}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140, padding: '4px', display: 'grid', gap: '4px' },
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ px: '9px' }}>
          <Iconify
            icon="fluent:edit-16-filled"
            width={20}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ px: '9px' }}>
          <Iconify icon="ion:eye-sharp" width={20} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem>
        <MenuItem
          onClick={() => showAlert('Inhabilitar!', '¿Esta seguro de inhabilitar la factura?')}
          sx={{ px: '9px' }}
        >
          <Iconify
            icon="material-symbols:no-sim"
            width={20}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Inhabilitar
        </MenuItem>
        <MenuItem
          onClick={() => showAlert('Delete!', '¿Esta seguro de eliminar la factura?')}
          sx={{ color: 'danger.main', px: '9px' }}
        >
          <Iconify icon="solar:trash-bin-minimalistic-bold" width={20} sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
      <AlertDialog alert={alert} onClose={onClose} />
    </>
  );
}
