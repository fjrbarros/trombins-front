import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    drawer: {
      width: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    drawer?: {
      width?: number;
    };
  }
}

const theme = createTheme({
  drawer: {
    width: 250,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;
