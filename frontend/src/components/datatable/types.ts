import { ReactNode } from "react";
import { Columns } from "../../types/ui";
import { SxProps } from "@mui/material";
import { KeyValue } from "../../types/hooks";

export interface CustomCell<T> {
    columnIndex: number;
    render: (data: T, rowIndex: number, onCollapse: () => void, collapse:boolean) => ReactNode;
}

export interface RowSelectedOptions {
    tooltip: string;
    icon: string;
    alertOptions?: {
      disable?: boolean;
      title?: string;
      content?: string;
      icon?: string;
    };
    fn: (selected:Array<number | string>, fn: (val:boolean) => void) => void;
}

export interface OptionsDatatable {
  filterFields?: Array<string>;
  checkbox: boolean;
  search: boolean;
  pagination: boolean;
  dense: boolean;
  selectField: string;
  toolbar: boolean;
  key: string;
  collapse: boolean;
}

export interface StyleDatatable {
  table?: { size?: 'small' | 'medium'; scrollY?: number | string; scrollX?: number | string };
  inputStyle?: object;
  tableHead?: SxProps;
}

export interface MuiDatatableProps<T extends KeyValue> {
  data: Array<T>;
  columns: Columns[];
  loading?: boolean;
  options?: Partial<OptionsDatatable>;
  rowsSelectedOptions?: Array<RowSelectedOptions>;
  customCell?: Array<CustomCell<T>>;
  toolbarComponents?: ReactNode;
  sx?: StyleDatatable;
  onSelectedRow?: (data: T, index: number) => void;
  renderChildRow?: (data: T, index: number) => JSX.Element;
}
