import { Dayjs } from 'dayjs';

export interface BeginningInventoryList {
  id: number;
  code: string;
  laboratory: string;
  user: string;
  last_date: string;
  hour: string;
  created_at: string;
  status: string;
  total: string;
}

export interface Detail {
  item_id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  subtotal: number;
}

export interface BeginningInventoryFormData {
  id?: number;
  laboratory: number;
  laboratory_name: string;
  status: string;
  last_date: Dayjs | null;
  note: string;
  total: number;
  detail: Detail[];
}

export interface BeginningInventoryFormProps {
  values: BeginningInventoryFormData;
  invalidateQuery: () => void;
}
