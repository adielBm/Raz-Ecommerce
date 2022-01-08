import Head from 'next/head'
import Footer from '../components/Footer'
import '../styles/globals.scss';
import CartContextProvider from '../contexts/CartContext'
import Notices from '../components/Notices'
import NoticesContextProvider from '../contexts/NoticesContext'
import client from '../apollo/client'
import { ApolloProvider } from '@apollo/client'
import Nav from '../components/Nav';
import App from "next/app"
import { getProductCategories } from '../apollo/getQueries';
import { API_URL } from "../utils/api";
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
    
  return (
    <CartContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Raz Ecommerce</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <Header />
        {/* 
        TODO: fix it in react 18 using React Server Component.  
        <Nav items={initData} /> 
        */}
        <main className="py-8 paddingscreen">
          <NoticesContextProvider>
            <Notices />
          </NoticesContextProvider>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ApolloProvider>
    </CartContextProvider>
  )
}

export default MyApp
