import { ReactNode } from 'react';

import { SxProps } from '@mui/system';

export interface MenuItem {
  key: number;
  title: string;
  path?: string;
  icon: ReactNode;
  children?: [
    {
      title: string;
      path: string;
    },
  ];
}
type Align = 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;

export interface Columns {
  id: string;
  label?: string;
  align?: Align;
  minWidth?: number | string;
  width?: number | string;
  disablePadding?: boolean;
  sort?: boolean;
}

export interface BasicTableHeadProps {
  rowCount?: number;
  headLabel: Columns[];
  numSelected: number | null;
  onSelectAllClick?: (checked: boolean) => void;
}

export interface TableHeadProps extends BasicTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  onSort: (id: string) => void;
  checkbox?: boolean;
  sx?: SxProps;
}
