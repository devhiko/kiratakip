import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap")
  }, [])

  return (
    <>
      <Layout>
        <Head>
          <meta name='theme-color' content='#3367D6' />
          <link rel='apple-touch-icon' href='/apple-touch.png' />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp