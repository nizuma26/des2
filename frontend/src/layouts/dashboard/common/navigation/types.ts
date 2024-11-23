import { ReactNode } from "react";

export interface NavSubItem {
  key: string;
  title: string;
  path: string;
  icon?: ReactNode;
  permissions?: string[];
}

export type NavItem = Omit<NavSubItem, 'path'> & {
  path?: string;
  icon: ReactNode;
  children?: NavSubItem[]
}

export type NavData = {
  title: string;
  icon: ReactNode;
  children: NavItem[];
  permissions?: string[];
};

export interface NavSectionProps {
  data: NavData[];
  bgcolor: string;
  loading: boolean;
};