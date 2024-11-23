export interface SupplierList {
    id: number;
    trade_name: string;
    legal_name?: string;
    rif: string;
    email: string;
    phone_number: string;
    is_active: boolean;
}

export interface Supplier {
    id?: number;
    trade_name: string;
    legal_name: string;
    rif: string;
    email: string;
    phone_number: string;
    contact_person: string;
    address: string;
    description: string;
    credit_limit: number;
    credit_days: number;
    postal_code: string;
    is_active: boolean;
}