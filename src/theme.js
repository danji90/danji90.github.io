import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#63a000';
const theme = createMuiTheme({
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
  overrides: {
    MuiTypography: {
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
    MuiCardContent: {
      root: {
        height: 120,
      },
    },
    MuiList: {
      root: {
        fontSize: 16,
      },
    },
    MuiAppBar: {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
    },
    MuiTabs: {
      root: {
        height: '100%',
      },
      flexContainer: {
        height: '100%',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'unset',
        color: '#fff',
        minWidth: '0 !important',
      },
    },
    MuiBox: {
      root: {
        padding: 20,
      },
    },
    MuiButton: {
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
  styles: {
    link: {
      textDecoration: 'none',
      color: primaryColor,
      '&:hover': {
        textDecoration: 'underline',
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