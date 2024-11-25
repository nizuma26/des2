import { PresetsColor } from "../theme/types";

export type NavColor = 'integrate' | 'apparent';

export interface State {
  darkMode: boolean;
  themeColorPresets: PresetsColor;
  orientationStore: string;
  navColor: NavColor,
}
export interface Actions {
  setDarkMode: (param:boolean) => void;
  setPresetColor: (param:PresetsColor) => void;
  setNavConfig: (param:string) => void;
  setNavColor: (param:NavColor) => void;
};