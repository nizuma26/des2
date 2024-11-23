export interface Auth {
  auth?: {
    access?: string;
    refresh?: string;
    username?: string;
    image?: string;
    email?: string;
  };
}

export interface TokenDecode {
    username: string;
    user_id: number;
    image?: string;
    email?: string;
    laboratory_id: number;
    laboratory_name: string;
    cash_register_name: string;
    is_superuser: boolean;
}

export interface AutocompleteOptions {
  value: number | string;
  label: string;
}

export interface GenericValues {
  id?: number;
  name: string;
  is_active: boolean;
}

export interface ChangeStates {
  action: string; selected: Array<number>;  selectAll: (value: boolean) => void
}

export interface BaseModalProps {
  onClose?: () => void;
  onSubmit?: (data:Record<string, any>, action?: "add" | "edit") => void;
}
