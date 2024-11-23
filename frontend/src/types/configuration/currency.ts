export type TypeCurrency = 'Principal' | 'Secundaria' | null

export interface Currency {
    id?: number;
    code: string;
    name: string;
    symbol: string;
    exchange_rate: number | null;
    is_active: boolean;
    is_foreign: boolean;
    with_tax: boolean;
    type_currency: TypeCurrency;
    tax?: number;
    created?: string;
    updated?: string;
}

export type CurrencyFormValues = Omit<Currency, "tax"> & {
    tax?: number | null;
}

export type ExchangeRate = Pick<Currency, 'code' | 'exchange_rate' | 'type_currency'>
