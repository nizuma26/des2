export interface IncomeSummary {
    id: string;
    order_code: string;
    order_date: string;
    order_hour: string;
    patient: string;
    invoice_number: string | null;
    invoice_date: string | null;
    invoice_hour: string | null;
    amount_paid: number;
    total: number;
}