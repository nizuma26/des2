import { ReactNode } from 'react';
import { create } from 'zustand';
import { Breakpoint } from '@mui/material';

interface State {
  isOpen: boolean;
  content: ReactNode | null;
  maxWidth: Breakpoint;
  isFullScreen: boolean;
}

interface Actions {
  showDialog: (content: ReactNode, maxWidth?: Breakpoint, fullScreen?: boolean) => void;
  closeDialog: () => void;
}

const useDialogStore = create<State & Actions>((set) => ({
  isOpen: false,
  content: null,
  maxWidth: 'xs',
  isFullScreen: false,
  showDialog: (content, maxWidth, fullScreen) => set(
    { isOpen: true, content: content, maxWidth: maxWidth ?? 'xs', isFullScreen: fullScreen ?? false }
  ),
  closeDialog: () => set({ isOpen: false, content: null }),
}));

export default useDialogStore;
