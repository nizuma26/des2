import { ReactNode } from 'react';

export interface Item {
  key: string;
  title: string;
  icon: ReactNode;
  path: string;
}

export interface Items extends Item {
  children?: Item[];
}
