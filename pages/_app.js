import Header from '../components/Header'
import Head from 'next/head'
import Footer from '../components/Footer'
import '../styles/globals.css';
import CartContextProvider from '../contexts/CartContext'
import Notices from '../components/Notices'
import NoticesContextProvider from '../contexts/NoticesContext'
import client from '../apollo/client'
import { ApolloProvider } from '@apollo/client'
import Nav from '../components/Nav';
import App from "next/app"
import { getProductCategories } from '../apollo/getQueries';
import { API_URL } from "../utils/api";

function MyApp({ Component, pageProps/* , initData */ }) {

  console.log(API_URL)

  return (
    <CartContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Raz Ecommerce</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <Header />
        {/* <Nav items={initData} /> */}
        <main className="p-8">
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

/* MyApp.getInitialProps = async (props) => {
  const appProps = await App.getInitialProps(props)
  const request = props.ctx.req
  const objToReturn = { ...appProps }
  if (!request?.url?.startsWith('/_next/data')) {
    objToReturn['initData'] = await getProductCategories()
  }
  return objToReturn;
} */

export default MyApp
