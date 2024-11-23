import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Actions, State } from './types';

//--------------------------------------------

export const useSettingsLayout = create(
  persist<State & Actions>(
    (set) => ({
      darkMode: false,
      themeColorPresets: 'blue',
      orientationStore: 'vertical',
      navColor: 'integrate',      
      setDarkMode: (param) => set({ darkMode: param }),
      setPresetColor: (param) => set({ themeColorPresets: param }),
      setNavConfig: (param) => set({ orientationStore: param }),
      setNavColor: (param) => set({ navColor: param }),
    }),
    {
      name: 'settings',
    }
  )
);
