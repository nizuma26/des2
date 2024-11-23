import { Control } from 'react-hook-form';
import { User } from '../../../../types/security/user';

export interface AutocompleteProps {
  control: Control<User>;
}

export interface CashRegisterSearchProps extends AutocompleteProps {
    userId?: number;
}