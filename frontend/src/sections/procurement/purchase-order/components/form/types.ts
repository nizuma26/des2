import { Control } from 'react-hook-form';

import { BaseModalProps } from '../../../../../types';
import { PurchaseOrderFormValues } from '../../../../../types/procurements/purchase-orders';
import { Supplier } from '../../../../../types/procurements/supplier';

export interface PurchaseOrderFormProps {
  values: PurchaseOrderFormValues;
  invalidateQuery: () => void;
}

type SupplierDialog = Omit<BaseModalProps, 'onSubmit'>;

export interface CreateSupplierDialogProps extends SupplierDialog {
  onSubmit: (data: Supplier) => void;
}

export interface SupplierSearchProps {
  setSupplierId: (id: number | null) => void;
  control: Control<PurchaseOrderFormValues>;
}

export interface InvoiceSummaryProps {
  mainCurrencyCode: string | null;
  secondaryCurrencyCode: string | null;
  exchangeRate: number | null;
}

export interface SupplierDataCardProps {
  setPaymentTerm: (paymentTerm:number | null) => void;
}
