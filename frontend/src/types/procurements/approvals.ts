import { Dayjs } from 'dayjs';
import { PurchaseRequisitionDetail } from './purchase-requisition';

export type ApprovalActions = 'Aprobado' | 'Rechazado' | 'Devuelto'

export interface Approval {
  id: number;
  approver: string;
  action: ApprovalActions;
  comment: string;
  operation: string;
  operation_code: string;
  approval_date: string;
}

export type ApprovalRequisitionValues = Omit<Approval, 'id' | 'approver' | 'approval_date'> & {
  approval_date: Dayjs;
  detail?: PurchaseRequisitionDetail[]
}
