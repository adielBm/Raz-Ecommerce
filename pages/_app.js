import Header from '../components/Header'
import Head from 'next/head'
import Footer from '../components/Footer'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme'
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/global.scss'
import Container from '@mui/material/Container';
import CartContextProvider from '../contexts/CartContext'
import Notices from '../components/Notices'
import NoticesContextProvider from '../contexts/NoticesContext'
import client from '../apollo/client'
import { ApolloProvider } from '@apollo/client'
import 'normalize.css'; // Note this

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
        <ApolloProvider client={client}>
          <Header />
          <Container component="main" maxWidth="xl">
            <NoticesContextProvider>
              <Notices />
            </NoticesContextProvider>
            <Component {...pageProps} />
          </Container>
          <Footer />
        </ApolloProvider>
      </CartContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
