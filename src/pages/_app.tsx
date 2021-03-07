import { useEffect } from 'react'
import { AppProps } from 'next/app'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')

import * as gtag from '@/lib/gtag'
import { Chakra } from '@/components/providers/chakra'
import { useRouter } from 'next/router'


function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <Chakra cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </Chakra>
  )
}

export default App

// https://chakra-ui.com/docs/features/color-mode
export { getServerSideProps } from "@/components/providers/chakra"