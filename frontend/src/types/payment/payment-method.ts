export interface PaymentMethod {
    id?: number;
    name: string;
    is_active: boolean;
    generate_account: boolean;
}