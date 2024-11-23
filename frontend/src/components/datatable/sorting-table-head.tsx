import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { TableHeadProps } from '../../types/ui';

import { visuallyHidden } from '../../utils/table';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SortingTableHead({
  order,
  orderBy,
  rowCount = 0,
  numSelected,
  headLabel,
  onSort,
  onSelectAllClick = () => {},
  checkbox = true,
  sx
}: TableHeadProps) {

  return (
    <TableHead>
      <TableRow>
        {checkbox && numSelected !== null && (
          <TableCell padding="checkbox" sx={{...sx}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllClick(event?.target?.checked)}
              inputProps={{
                'aria-label': 'select all desserts',
              }}              
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell?.align ? headCell.align : 'left'}
            padding={headCell?.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell?.width, minWidth: headCell?.minWidth, ...sx }}            
          >
            {headCell?.sort !== false ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                <Typography variant='subtitle2' noWrap minWidth={headCell?.width}>
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography variant='subtitle2' noWrap minWidth={headCell?.width}>
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
