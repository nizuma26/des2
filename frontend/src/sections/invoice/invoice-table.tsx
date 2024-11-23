//@mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { emptyRows } from '../../utils/table';

import { useTable } from '../../hooks/use-table-utils';

import invoice from '../../_mock/invoice.json';

import { headLabel } from './context';

import TableToolbar from '../../components/table/table-toolbar';
import SortingTableHead from '../../components/datatable/sorting-table-head';
import InputSearch from '../../components/input-search';
import TableNoData from '../../components/table/table-no-data';
import RowsSelected from '../../components/datatable/rows-selected';
import TableEmptyRows from '../../components/table/table-empty-rows';

import InvoiceTableRow from './invoice-table-row';

// ----------------------------------------------------------------------

export default function InvoiceTable() {

  const {
    page,
    order,
    rowsPerPage,
    selected,
    orderBy,
    filterName,
    dense,
    handleChangePage,
    handleChangeRowsPerPage,
    debounceOnFilter,
    handleSort,
    handleClick,
    handleSelectAllClick,
    dataFilter,
    setDense,
    cleanFilterText,
  } = useTable({data:invoice, filterFields: ['patient', 'code', 'total']});

  const dataFiltered = dataFilter();

  const notFound = !dataFiltered.length && !!filterName;

  const selectAll = (checked:boolean) => {
    const ids = checked ? dataFiltered.map((el) => el.id) : []
    handleSelectAllClick(ids, notFound);
  }

  return (
    <>
      <TableToolbar>
        <InputSearch onChange={debounceOnFilter} clean={cleanFilterText} />
      </TableToolbar>
      {selected.length > 0 && (
          <RowsSelected
            numSelected={selected.length}
            dense={dense}
            notFound={notFound}
            rowCount={invoice.length}
            onSelectAllClick={selectAll}
          />
        )}
      <TableContainer sx={{ maxHeight: 540, position: 'relative' }}>        
        <Table
          sx={{ minWidth: 960 }}
          size={dense ? 'small' : 'medium'}
          stickyHeader
          aria-label="sticky table"
        >
          <SortingTableHead
            order={order}
            orderBy={orderBy}
            rowCount={dataFiltered.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={selectAll}
            headLabel={headLabel}
          />
          <TableBody>
            {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => (
              <InvoiceTableRow
                key={row.id}
                id={row.id}
                patient={row.patient}
                code={row.code}
                date={row.date}
                total={row.total}
                status={row.status}
                selected={selected.indexOf(row.id) !== -1}
                handleClick={handleClick}
                dense={dense}
              />
            ))}

            <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, invoice.length)} />

            {notFound && <TableNoData />}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          sx={{ width: '100%', borderTop: (theme) => `dashed 1px ${theme.palette.divider}` }}
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FormControlLabel
          sx={{
            position: 'absolute',
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            ml: '-11px',
            mr: '16px',
            pt: '12px',
            pl: '16px',
            pb: '12px',
            top: '0px',
          }}
          control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />}
          label="Dense"
        />
      </Box>
    </>
  );
}
