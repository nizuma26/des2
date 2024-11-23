import { create } from 'zustand';

type State = {
  access: string;
  refresh: string;
};
type Actions = {
  setToken: (access: string, refresh: string) => void;
  logout: () => void;
};

export const useAuthPrivate = create<State & Actions>((set) => ({
  access: '',
  refresh: '',
  setToken: (access, refresh) =>
    set(() => ({
      access,
      refresh,
    })),
  logout: () => set(() => ({ access: '', refresh: '' })),
}));