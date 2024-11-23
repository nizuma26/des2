import { ReactNode, MouseEvent, ChangeEvent } from 'react';
//@mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { emptyRows } from '../../utils/table';

import BasicTableHead from './basic-table-head';
import TableNoData from './table-no-data';
import TableLoadingData from '../datatable/table-loading';
import TableEmptyRows from './table-empty-rows';

// ----------------------------------------------------------------------

interface BasicTable {
  headCells: [
    {
      id: string;
      label: string;
      align: string;
    },
  ];
  arrayLength: number;
  isLoadingData?: boolean;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: MouseEvent | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

export default function BasicTable({
  headCells,
  arrayLength = 0,
  isLoadingData = false,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  children,
}: BasicTable) {
  const notFound = !arrayLength;

  return (
    <>
      <TableContainer sx={{ maxHeight: 540, position: 'relative' }}>
        <Table sx={{ minWidth: 960 }} size="small" stickyHeader aria-label="sticky table">
          <BasicTableHead rowCount={arrayLength} headLabel={headCells} />
          <TableBody>
            {isLoadingData ? (
              <TableLoadingData />
            ) : (
              <>
                {children}
                {notFound && <TableNoData colSpan={headCells.length} />}
              </>
            )}
            <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, 8)} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ width: '100%', borderTop: (theme) => `dashed 1px ${theme.palette.divider}` }}
        page={page}
        component="div"
        count={arrayLength}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
