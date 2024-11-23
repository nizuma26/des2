import { Theme, Palette, PaletteColor, PaletteOptions, ThemeOptions } from "@mui/material";

interface ExtendedPaletteColor extends PaletteColor {
    lighter: string;
    darker: string;
}

export interface ExtendedPalette extends PaletteOptions {
    primary: ExtendedPaletteColor;
    secondary: ExtendedPaletteColor;
    error: ExtendedPaletteColor;
    warning: ExtendedPaletteColor;
    info: ExtendedPaletteColor;
    success: ExtendedPaletteColor;
  }

export interface ExtendedThemeOptions extends ThemeOptions {
 palette: ExtendedPalette;
 customShadows: {
    z1: string;
    z4: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    card: string;
    dropdown: string;
    dialog: string;
    paper: string;
    primary: string;
    info: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
  };
}
export interface ExtendedTheme extends Theme {
    palette: ExtendedPalette;
}