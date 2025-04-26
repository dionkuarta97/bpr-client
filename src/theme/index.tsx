import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#A5D6A7',
      light: '#E8F5E9',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#333333',
            borderRadius: '15px',
            backgroundColor: '#ECEFF1',
          },
          '& .MuiInputBase-root': {
            borderRadius: '15px',
            backgroundColor: '#ECEFF1',
          },
        },
      },
    },
  },
});

export default theme;
