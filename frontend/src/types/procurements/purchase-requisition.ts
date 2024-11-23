import { Status } from './commonTypes';
import { Dayjs } from 'dayjs';

export interface PurchaseRequisitionList {
  id: number;
  code: string;
  laboratory: string;
  request_date: string;
  required_date: string;
  request_hour: string;
  requester: string;
  status: Status;
}

export interface PurchaseRequisitionDetail {
  item_id: number;
  item_code?: string;
  item_category: string | null;
  item_measure_unit: string;
  item_name: string;
  quantity: number;
  approved_amount?: number;
}

export interface PurchaseRequisition {
  id: number;
  code: string;
  request_date: string;
  required_date: string;
  request_hour: string;
  requester: {
    names: string;
    last_names: string;
    cedula: string;
    image: string;
  };
  laboratory: {
    name: string;
    code: string;
    logo: string;
  };
  created_at?: string;
  comment: string;
  status: Status;
  detail: PurchaseRequisitionDetail[];
}

export type PurchaseRequisitionFormValues = Pick<
  PurchaseRequisition,
  'comment' | 'detail' | 'status'
> & {
  id?: number;
  request_date: Dayjs | string;
  required_date: Dayjs | string;
  laboratory?: number | null;
  status: Status;
};
