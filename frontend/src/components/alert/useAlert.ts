import { ReactNode } from 'react';

import { create } from 'zustand';

interface State {
  isOpen?: boolean;
  title?: string;
  content: string;
  icon?: string | null;
  fn?: () => void;
}

interface Actions {
  showAlert: (props: State) => void;
  closeAlert: () => void;
}

const ALERT: State = {
  isOpen: false,
  title: 'Advertencia',
  content: '¿Esta seguro de realizar la siguiente acción?',
  icon: 'pajamas:warning-solid',
  fn: () => {},
};

export const useAlert = create<State & Actions>((set) => ({
  ...ALERT,
  showAlert: ({ isOpen = true, title=ALERT.title, content=ALERT.content, fn = ALERT.fn, icon }) =>
    set(() => ({
      isOpen: isOpen,
      title: title,
      content: content,
      fn: fn,
      icon: icon,
    })),
  closeAlert: () => set((state) => ({ ...state, isOpen: false })),
}));

