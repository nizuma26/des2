//@mui
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

import { BasicTableHeadProps } from '../../types/ui';

// ----------------------------------------------------------------------

export default function BasicTableHead({
  rowCount=0,
  headLabel,
  numSelected=null,
  onSelectAllClick=()=>{},
}: BasicTableHeadProps) {

  return (
    <TableHead>
      <TableRow>
        {numSelected !== null && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllClick(event?.target?.checked)}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
