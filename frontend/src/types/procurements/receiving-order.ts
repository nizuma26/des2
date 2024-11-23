import { PurchaseOrder, PurchaseOrderList } from './purchase-orders';

type ReceivingPurchaseStatus = 'Parcialmente Recibido' | 'Completamente Recibido' | 'Anulado';

export interface PurchaseOrderListFields extends PurchaseOrderList {
  statusReceiving: ReceivingPurchaseStatus;
}

export interface ReceivingPurchaseList {
  id: number;
  code: string;
  supplier: string;
  reception_date: string;
  reception_hour: string;
  confirmed_date: string;
  main_total: number;
  status: ReceivingPurchaseStatus;
}

export interface ReceivingPurchase {
  code: string;
  order: PurchaseOrder;
  status: ReceivingPurchaseStatus;
  created_at: string;
  reception_date: string;
  reception_hour: string;
  comment: string;
}

export interface ReceivingPurchaseDetail {
  item_id: number;
  item_code?: string;
  item_name: string;
  item_category: string;
  item_description: string;
  comment: string;
  received_quantity: number;
  expected_quantity: number;
  price: number;
}

export type ReceivingPurchaseFormValues = Pick<ReceivingPurchase, 'status' | 'comment'> & {
  id?: number;
  order?: number;
  status: ReceivingPurchaseStatus;
  comment: string;
  detail:ReceivingPurchaseDetail[];
};
