//@mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { emptyRows } from '../../utils/table';
import { useTable } from '../../hooks/use-table-utils';

import { KeyValue } from '../../types/hooks';

import '../scrollbar/scrollbar.css';

import { MuiDatatableProps } from './types';

import { DEFAULT_OPTIONS } from './context';

import TableNoData from './table-no-data';
import TableLoadingData from './table-loading';
import RowDatatable from './rows-datatable';
import TableEmptyRows from './table-empty-rows';
import TableToolbar from './table-toolbar';
import InputSearch from '../input-search';
import RowsSelected from './rows-selected';
import SortingTableHead from './sorting-table-head';
import RowSelectedOption from './row-selected-option';
import { AlertDialog } from '../alert';

// ----------------------------------------------------------------------

export default function MuiDatatable<T extends KeyValue>({
  data = [],
  columns,
  loading = false,
  options = {},
  rowsSelectedOptions,
  customCell,
  toolbarComponents,
  sx = {},
  onSelectedRow,
  renderChildRow,
}: MuiDatatableProps<T>) {
  const {
    page,
    order,
    rowsPerPage,
    orderBy,
    selected,
    dense,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
    debounceOnFilter,
    handleSort,
    onSelectRow,
    handleSelectAllClick,
    dataFiltered,
    setDense,
    cleanFilterText,
  } = useTable({
    data: data,
    filterFields: options?.filterFields,
    defaultRowsPerPage: 5,
  });

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const notFound = !dataFiltered.length;
  const isCustomCell = customCell && customCell.length > 0;

  const selectField = mergedOptions?.selectField ? mergedOptions?.selectField : 'id';

  const selectAll = (checked: boolean) => {
    const ids = checked ? (dataFiltered.map((el) => el?.[selectField]) ?? []) : [];
    handleSelectAllClick(ids, notFound);
  };

  const defaultLabelDisplayedRows = ({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) => {
    return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
  };

  const newDataFiltered =
    mergedOptions && mergedOptions.pagination !== false
      ? dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : dataFiltered;

  const isDense = dense ? 'small' : 'medium';

  const sizeTable = sx?.table?.size ? sx?.table.size : isDense;

  const scrollY = sx?.table?.scrollY;

  const scrollX = sx?.table?.scrollX;

  const key = mergedOptions?.key ?? 'id';

  const isTfoot = mergedOptions?.pagination !== false || mergedOptions?.dense !== false;

  return (
    <>
      {mergedOptions?.toolbar !== false && (
        <TableToolbar>
          {mergedOptions && mergedOptions.search !== false && (
            <InputSearch
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                debounceOnFilter(event.target.value);
                onResetPage();
              }}
              clean={cleanFilterText}
              sx={sx?.inputStyle}
            />
          )}
          {toolbarComponents}
        </TableToolbar>
      )}

      {mergedOptions?.checkbox !== false && selected.length > 0 && (
        <RowsSelected
          numSelected={selected.length}
          dense={sizeTable === 'small'}
          notFound={notFound}
          rowCount={data.length}
          onSelectAllClick={selectAll}
        >
          {rowsSelectedOptions?.map((option, index) => (
            <RowSelectedOption
              key={`${option?.tooltip}-${index}`}
              tooltip={option?.tooltip}
              icon={option?.icon}
              alertOptions={option?.alertOptions}
              fn={option.fn}
              selected={selected}
              selectAll={selectAll}
            />
          ))}
        </RowsSelected>
      )}
      <TableContainer
        sx={{ maxHeight: scrollY ? scrollY : 540, position: 'relative', px: 0 }}
        className="scrollbar"
      >
        <Table
          size={sizeTable}
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: scrollX ? scrollX : 800 }}
        >
          <SortingTableHead
            order={order}
            orderBy={orderBy}
            rowCount={dataFiltered.length}
            numSelected={selected.length}
            onSort={handleSort}
            onSelectAllClick={selectAll}
            headLabel={columns}
            checkbox={mergedOptions?.checkbox}
            sx={sx?.tableHead}
          />
          <TableBody>
            {loading ? (
              <TableLoadingData colSpan={columns?.length} />
            ) : (
              <>
                {notFound && <TableNoData colSpan={columns?.length} />}
                {newDataFiltered.map((row, rowIndex) => {
                  return (
                    <RowDatatable
                      key={row[key]}
                      rowIndex={rowIndex}
                      row={row}
                      columns={columns}
                      isCustomCell={isCustomCell}
                      isCheckbox={mergedOptions?.checkbox}
                      isSelected={selected.includes(row?.[selectField])}
                      selectField={selectField}
                      onCheckboxClick={onSelectRow}
                      customCell={customCell}
                      onSelectedRow={onSelectedRow}
                      collapse={mergedOptions?.collapse ?? false}
                      renderChildRow={renderChildRow}
                    />
                  );
                })}
              </>
            )}
            <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />
          </TableBody>
        </Table>
      </TableContainer>
      {isTfoot && (
        <Box sx={{ position: 'relative', height: 58 }}>
          <TablePagination
            sx={{ width: '100%', borderTop: (theme) => `dashed 1px ${theme.palette.divider}` }}
            page={page}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
            labelRowsPerPage="Filas por página"
            onPageChange={onChangePage}
            rowsPerPageOptions={[5, 25, 50, 100]}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          {mergedOptions?.dense !== false && (
            <FormControlLabel
              sx={{
                position: { sm: 'absolute' },
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
              control={
                <Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />
              }
              label="Dense"
            />
          )}
        </Box>
      )}
      <AlertDialog />
    </>
  );
}
