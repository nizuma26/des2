import { Control } from "react-hook-form";

import { Currency, CurrencyFormValues } from "../../../../types/configuration/currency";

export interface PopupOptionsProps {
    data: Currency
}

export interface CurrencyTaxProps {
    control: Control<CurrencyFormValues>
}