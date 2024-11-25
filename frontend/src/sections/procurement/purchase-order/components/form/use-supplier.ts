import { create } from 'zustand';

import { Supplier } from '../../../../../types/procurements/supplier';

//--------------------------------------------

export type SupplierSeleted = Pick<
  Supplier,
  'id' | 'legal_name' | 'address' | 'email' | 'phone_number' | 'rif' | 'credit_days' | 'credit_limit'
>;

type State = {
  supplier: SupplierSeleted | null;
};
type Actions = {
  setSupplier: (patient: SupplierSeleted | null) => void;
};

export const useSupplier = create<State & Actions>((set) => ({
  supplier: null,
  setSupplier: (supplier) => set({ supplier: supplier }),
}));
