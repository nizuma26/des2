import { CostType } from "../configuration/lab-test";

export type Concept = 'Descuento' | 'Incremento' | 'Exonerado';

export interface Affiliation {
    id?: number;
    name: string;
    value: number;
    concept: Concept;
    rif: string;
    email: string;
    phone_number: string;
    contact_person: string;
    address: string;
    credit_limit: number;
    credit_days: number;
    postal_code: string;
    is_active: boolean;
    price_type: CostType;
}