import { create } from 'zustand';

import { Patient } from '../../../../../types/orders/patients';

//--------------------------------------------

type State = {
  patient: Patient | null;
};
type Actions = {
  setPatient: (patient: Patient | null) => void;
};

export const usePatient = create<State & Actions>((set) => ({
  patient: null,
  setPatient: (patient) => set({ patient: patient }),
}));