import { ReactNode, useState } from 'react';
//@mui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';

import { KeyValue } from '../../types/hooks';
import { Columns } from '../../types/ui';
import { CustomCell } from './types';

interface RowsDatatable<T extends KeyValue> {
  rowIndex: number;
  row: T;
  columns: Columns[];
  isCustomCell?: boolean;
  isCheckbox?: boolean;
  isSelected?: boolean;
  selectField: string;
  collapse: boolean;
  customCell?: Array<CustomCell<T>>;
  onCheckboxClick: (inputValue:string | number) => void;
  onSelectedRow?: (data: T, index: number) => void;
  renderChildRow?: (data: T, index: number) => ReactNode;
}

const RowDatatable = <T extends KeyValue>({
  rowIndex,
  row,
  columns,
  isCustomCell = false,
  isCheckbox = true,
  isSelected,
  selectField,
  customCell,
  collapse,
  onCheckboxClick,
  onSelectedRow,
  renderChildRow,
}: RowsDatatable<T>) => {

  const [isCollapse, setIsCollapse] = useState(false);

  const showCollapse = () => setIsCollapse(true);
  const hideCollapse = () => setIsCollapse(false);

  const onCollapse = () => {
    isCollapse ? hideCollapse() : showCollapse();
  };

  const handleSelect = (row: T) => {
    if (onSelectedRow) {
      onSelectedRow(row, rowIndex)
    };
  };
  const cursor = onSelectedRow ? 'pointer' : 'auto';

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        aria-checked={isSelected}
        selected={isSelected}
        sx={{ cursor: cursor }}
      >
        {isCheckbox !== false && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={isSelected} onChange={() => onCheckboxClick(row?.[selectField])} />
          </TableCell>
        )}
        {columns.map((key, index) => {
          const celld =
            isCustomCell && customCell?.some((cell) => cell?.columnIndex === index)
              ? customCell
                  .find((cell) => cell?.columnIndex === index)
                  ?.render(row, rowIndex, onCollapse, isCollapse)
              : (row?.[key?.id]?.toString() ?? '-----');

          return (
            <TableCell
              key={`${rowIndex}-${index}`}
              align={key?.align ? key.align : 'left'}
              sx={{ width: key?.width }}
              onClick={() => handleSelect(row)}
            >
              {celld}
            </TableCell>
          );
        })}
      </TableRow>
      {collapse && (
        <TableRow>
          <TableCell sx={{ pb: 0, pt: 0, bgcolor: "background.neutral" }} colSpan={columns.length}>
              <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                <Box sx={{ my:2 }}>{renderChildRow && renderChildRow(row, rowIndex)}</Box>
              </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default RowDatatable;
