import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#17324f',
    },
    secondary: {
      main: '#ef524a',
    },
    background: {
      default: '#f2f7fd',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeightBold: 800,
    fontWeightRegular: 400,
  },
  direction: 'rtl',
  shape: {
    borderRadius: 10,
  },
})