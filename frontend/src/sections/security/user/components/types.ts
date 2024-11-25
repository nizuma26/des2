import { Control } from 'react-hook-form';
import { UserFormValues } from '../../../../types/security/user';

export interface AutocompleteProps {
  control: Control<UserFormValues>;
}

export interface CashRegisterSearchProps extends AutocompleteProps {
    userId?: number;
}