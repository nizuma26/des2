export interface UserRetrieve {
  names: string;
  last_names: string;
  cedula: number | null;
  email: string;
  username: string;
  is_active: boolean;
  phone_number: string;
  password: string;
  address: string;
  image: string | null;
  groups: number | string | number[];
  laboratory: number | string | null;
}

export interface UserList {
  id: number;
  username: string;
  cedula: number | null;
  email: string;
  laboratory: string;
  role: string;
  image: string;
  is_active: boolean;
}

type UserFields = Omit<UserList, 'id' | 'image' | 'role' | 'laboratory'> & {
  id?: number;
};

export interface User extends UserFields {
  names: string;
  last_names: string;
  image: File | null | string;
  phone_number: string;
  address: string;
  password: string;
  groups: number[] | number;
  laboratory?: number | null;
  cash_register: number | null;
  charges?: number | null;
}
