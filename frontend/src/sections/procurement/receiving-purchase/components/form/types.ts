import { Control, UseFormRegister } from 'react-hook-form';

import { PurchaseOrder } from '../../../../../types/procurements/purchase-orders';
import { ReceivingPurchaseFormValues } from '../../../../../types/procurements/receiving-order';

export interface ReceivingOrderFormProps {
  values: ReceivingPurchaseFormValues;
  orderData: PurchaseOrder
  invalidateQuery: () => void;
}

export interface ItemInfoProps {
  label:string;
  value: string;
}

export interface ReceivedQuantityProps {
  expectedQuantity:number;
  control: Control<ReceivingPurchaseFormValues>;
  index: number;
}

export interface QuantityFieldProps {
  register: UseFormRegister<ReceivingPurchaseFormValues>;
  index: number;
  //receivedQuantity:number
}

export interface CommentDialogProps {
  addComment: (comment:string) => void;
  value: string | null;
}