import { grey } from "../../theme/presets-color";
import { SkeletonConfigTypes } from "./types";

// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
  WIDTH_COLLAPSE: 120,
  HEIGHT_HORIZONTAL: 160,
  NAV_COLOR: {
    integrate: {
      dark: grey[900],
      light: grey[50]
    },
    apparent: {
      dark: grey[800],
      light: grey[900]
    }
  }
};

export const COLLAPSE_NAV_ITEMS = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 44,
  py: 1,
  borderRadius: 0.75,
  typography: 'body2',
  textTransform: 'capitalize',
  fontWeight: 'fontWeightMedium',
  fontSize: 10,
  mr: 0,
  '&:hover': {
    bgcolor: 'action.hover',
  },
};

export const NAV_ITEMS = {
  minHeight: 44,
  borderRadius: 0.75,
  textTransform: 'capitalize',
  fontWeight: 'fontWeightMedium',
};

export const HORIZONTAL_NAV_ITEMS = {
  px: '7px',
  py: '7px',
  borderRadius: 0.75,
  typography: 'subtitule2',
  textTransform: 'capitalize',
  fontWeight: 'fontWeightMedium',
  fontSize: '0.875rem',
};

export const SVG_SUN = 'url("/assets/icons/ic_sun.svg") center center / contain no-repeat';
export const SVG_MOON = 'url("/assets/icons/ic_moon.svg") center center / contain no-repeat'

export const SKELETON_CONFIG:SkeletonConfigTypes = {
    GLOBAL: {
      ANIMATION: "wave"
    },
    VERTICAL: {
      ITEM_HEIGHT: 35
    },
    MINI: {
      ITEM_HEIGHT: 70
    },
    HORIZONTAL: {
      ITEM_HEIGHT: 42,
      ITEM_WIDTH: 140
    }
}