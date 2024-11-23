import { Dayjs } from 'dayjs';

type PurchaseState = 'Borrador' | 'Anulada' | 'Por pagar' | 'Completada';

export interface PurchaseList {
  id: number;
  code: string | null;
  laboratory: string;
  supplier: string;
  payment_method?: string;
  last_date: string | null;
  hour?: string;
  total_bs: number;
  selected_currency_total: number;
  status: PurchaseState;
}

interface Item {
  id?: number;
  code?: string;
  name?: string;
  image?: string | null;
  category?: string;
  description?: string;
  serial_number?: boolean;
  lot_number?: boolean;
  is_inventoriable?: boolean;
}

export interface PurchaseDetail extends Item {
  item_id: number;
  item_code?: string;
  item_image: string | null;
  item_category: string | null;
  item: string;
  quantity: number;
  cost_bs: number;
  selected_currency_cost: number;
  tax: number;
  discount: number;
  subtotal_bs: number;
  total_bs: number;
  selected_currency_total: number;
  cost_with_tax?: number;
}

type PurchaseFields = Omit<PurchaseList, 'id' | 'last_date' | 'code' | 'laboratory'>;

export interface Purchase extends PurchaseFields {
  id?: number;
  laboratory: number | null;
  user?: number | null;
  payment_method: string;
  observation: string;
  voucher: number | null;
  currency: number | null;
  voucher_number: string;
  credit_days: number | null;
  credit_limit: number | null;
  exchange_rate: number;
  discount: number;
  tax: number;
  subtotal_bs: number;
  selected_currency_subtotal: number;
  last_date: Dayjs | null;
  due_date: Dayjs | null;
  detail: PurchaseDetail[];
}

export interface PurchaseFormProps {
  values: Purchase;
  invalidateQuery: () => void;
}
