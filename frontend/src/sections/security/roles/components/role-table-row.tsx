import { useState, MouseEvent, ChangeEvent } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useRouter } from '../../../../routes/hooks';

import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface RoleTableRow {
  id: number;
  name: string;
  permission_number: number;
  selected: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  handleDelete: (text: string, id: number) => void;
  dense: boolean;
}

export default function RoleTableRow({
  id,
  selected,
  name,
  permission_number,
  handleClick,
  handleDelete,
  dense,
}: RoleTableRow) {
  const [openOptions, setOpenOptions] = useState<HTMLButtonElement | null>(null);

  const router = useRouter();

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

        <TableCell>{name}</TableCell>
        <TableCell align='center'><Label color='primary'>{permission_number}</Label></TableCell>
        
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
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
        <MenuItem sx={{ px: '9px' }} onClick={() => router.replace(`/role/edit/${id}`)}>
          <Iconify
            icon="fluent:edit-16-filled"
            width={18}
            sx={{ mr: 1, color: 'text.secondary' }}
          />
          Editar
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ px: '9px' }}>
          <Iconify icon="ion:eye-sharp" width={19} sx={{ color: 'text.secondary', mr: 1 }} />
          Ver detalle
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(name, id), handleCloseMenu();
          }}
          sx={{ color: 'danger.main', px: '9px' }}
        >
          <Iconify icon="solar:trash-bin-minimalistic-bold" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
}
