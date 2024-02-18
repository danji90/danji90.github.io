import { createTheme } from '@mui/material/styles';

const primaryColor = '#63a000';
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: '#f55',
    },
    text: {
      primary: '#565656',
      light: '#fff',
    },
  },
  colors: {
    primary: primaryColor,
    secondary: '#f55',
  },
  typography: {
    fontSize: 16,
  },
  props: {
    Link: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 36,
          fontFamily: "'Montserrat', sans-serif",
          margin: '15px 0',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: 24,
          margin: '12px 0',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'bold',
        },
        h3: {
          fontSize: 20,
          fontFamily: "'Montserrat', sans-serif",
          margin: '8px 0',
          fontWeight: 'bold',
        },
        h4: {
          fontSize: 18,
          fontFamily: "'Montserrat', sans-serif",
          margin: '6px 0',
          fontWeight: 'bold',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          height: 120,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: '100%',
        },
        flexContainer: {
          height: '100%',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
          color: '#fff',
          minWidth: '0 !important',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          padding: 20,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
          color: 'white',
          backgroundColor: '#63a000',
          transition: 'opacity 300ms',
          '&:hover': {
            backgroundColor: '#63a000',
            opacity: 0.8,
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          '&$disabled': {
            backgroundColor: 'white',
            opacity: 0.6,
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          '&:hover': { textDecoration: 'underline' },
        },
      },
    },
  },
  styles: {
    link: {
      textDecoration: 'none',
      color: primaryColor,
      '&:hover': { textDecoration: 'underline' },
    },
    scrollBarThin: {
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(40, 44, 52, 0.5) #f5f5f5',
      '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f5f5f5',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(40, 44, 52, 0.5)',
      },
    },
  },
  animations: {
    fadeIn: () => {
      return {
        '0%': {
          opacity: 0,
        },
        '100%': {
          opacity: 1,
        },
      };
    },
    pulse: (otherTransformProps) => {
      return {
        '0%': {
          transform: `scale(.9) ${otherTransformProps || ''}`,
        },
        '70%': {
          transform: `scale(1) ${otherTransformProps || ''}`,
          boxShadow: '0 0 0 50px rgba(99,160,0, 0)',
        },
        '100%': {
          transform: `scale(.9) ${otherTransformProps || ''}`,
          boxShadow: '0 0 0 0 rgba(99,160,0, 0)',
        },
      };
    },
  },
});

export default theme;
