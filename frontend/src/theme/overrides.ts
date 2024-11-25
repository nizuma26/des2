import { alpha, type Theme, type  Components} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export function overrides(theme:Theme):Components {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.4),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: '#fff',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          transition: '180ms all',
          boxShadow: 'inherit',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `0 14px 26px -12px ${alpha(theme.palette.primary.main, 0.32)},0 4px 23px 0 rgba(0,0,0,.12),0 8px 10px -5px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
          '&:active': {
            transform: 'scale(0.95) translateZ(0px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: theme.palette.background.paper,
          backgroundColor: theme.palette.text.primary,
          fontSize: '0.875rem',
          borderRadius: '8px',
        },
        deleteIcon: {
          color: theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.background.default,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
          boxShadow: theme.customShadows.card,
          borderRadius: 16,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: '12px 20px',
          marginLeft: 16,
          marginRight: 16,
          marginTop: -24,
          borderRadius: '0.5rem',
          overflow: 'visible',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          boxShadow: `rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, ${alpha(theme.palette.primary.light, 0.2)} 0rem 0.4375rem 0.625rem -0.3125rem`,
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: alpha(theme.palette.grey[500], 0.24),
          },
        },        
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.card,
          backgroundImage: 'none',
          borderRadius: '15px',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          boxShadow: theme.customShadows.card,
          backgroundImage: 'url("/assets/cyan-blur.png"), url("/assets/red-blur.png")',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'right top, left bottom',
          backgroundSize: '50%, 50%',
          zIndex: 5,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          boxShadow: theme.customShadows.card,
          backgroundImage: 'url("/assets/cyan-blur.png"), url("/assets/red-blur.png")',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'right top, left bottom',
          backgroundSize: '50%, 35%',
          fontSize: '0.875rem',
          zIndex: 5,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          overflow: 'hidden',
        },
        body: {
          borderBottom: `1px dashed ${theme.palette.action.selected}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.04), // Color de fondo cuando está seleccionada
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.dark, 0.08),
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          borderRadius: '6px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha(theme.palette.background.default, 0.9),
          backgroundImage: 'url("/assets/cyan-blur.png"), url("/assets/red-blur.png")',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'right top, left bottom',
          backgroundSize: '50%, 50%',
          width: 280,
        },
      },
    },
  };
}
