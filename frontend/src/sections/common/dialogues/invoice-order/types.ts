import { BaseModalProps } from "../../../../types";
import { PaymentType } from "../../../../types/orders/payments";

export interface GenerateInvoiceDialogProps extends BaseModalProps {
    orderId: number;
    orderCode: string;
    clientName: string;
    cedulaOrRif: string;
    address: string;
    phone_number: string;
    total: number;
    secondaryTotal: number;
    amoundPaid: number;
    paymentType: PaymentType
}