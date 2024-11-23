import { BaseModalProps } from '../../../../../types';
import { CashRegister } from '../../../../../types/configuration/cash-register';

export interface CashRegisterFormDialogProps extends BaseModalProps {
  values?: CashRegister;
}
