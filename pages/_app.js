import Header from '../components/Header'
import Head from 'next/head'
import Footer from '../components/Footer'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme'
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/global.css'
import Container from '@mui/material/Container';
import CartContextProvider from '../contexts/CartContext'
import AlertCart from '../components/AlertCart'


function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <title>Raz Ecommerce</title>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <Header />
        <Container component="main" maxWidth="xl">
          <AlertCart />
          <Component {...pageProps} />
        </Container>
        <Footer />
      </CartContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
