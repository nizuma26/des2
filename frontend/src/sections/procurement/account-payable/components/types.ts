import { Control, FieldValues, Path } from "react-hook-form";

import { Payment } from "../../../../types/common/payment";
import { AccountPayable } from "../../../../types/procurements/account-payable";

export type AccountPayableList = Omit<AccountPayable, 'status' | 'debt'>

export type PaymentFormValues = Omit<Payment, 'bank'> & {
    bank?: number;
}

export interface PaymentMethodToggleButtonsProps<TField extends FieldValues> {
    name: Path<TField>;
    control: Control<TField>;
  }