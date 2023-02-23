import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Meta, Sidebar, Footer, Toast, Confirm } from 'components'
import 'css/global.css'

export default ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Meta />
      {pageProps.session ? (
        <div className='flex'>
          <Sidebar session={pageProps.session} />
          <div className='w-full'>
            <main className='overflow-hidden py-12 md:py-16'>
              <Component {...pageProps} />
              <Toast />
              <Confirm />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <main>
          <Component {...pageProps} />
        </main>
      )}
    </SessionProvider>
  )
}