import { BaseModalProps } from '../../../../../types';
import { Bank } from '../../../../../types/configuration/banks';

export interface BankFormDialogProps extends BaseModalProps {
  values?: Bank;
}
