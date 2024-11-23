import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { OrderInvoiceFormValues, OrderToBillList } from '../../../../../types/orders/order-invoice';
import { LabTest, PendingOrder } from '../../../../../types/orders/result';
import { BaseModalProps } from '../../../../../types';

export interface ChildRowProps {
  order: PendingOrder;
  onClick: (order: PendingOrder, labTest: LabTest) => void;
}

export interface ItemProps {
  orderId: number;
  labTest: LabTest;
  onClick: () => void;
  enabledRefetch: boolean;
}

export interface InvoiceSummaryProps {
  orders: OrderToBillList[];
  setValue: UseFormSetValue<OrderInvoiceFormValues>;
}

export interface SearchClientDialogProps extends BaseModalProps {
  setClientData: (
    nameOrCompanyName: string,
    address: string,
    phoneNumber: string,
    clientId: number | null
  ) => void;
  getValues: UseFormGetValues<OrderInvoiceFormValues>;
}
