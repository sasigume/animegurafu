import { Flex, useColorMode, FlexProps, Box, Center, Container, Text, Button, Link } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Hero } from './Hero'
import LayoutDrawer from './layout-drawer'
import { CTA } from './CTA'
import { DarkModeSwitch } from '../common/DarkModeSwitch'
import LinkChakra from '../common/link-chakra'

interface LayoutProps {
  children: ReactNode,
  debugInfo?: {
    lastGSP: Date
    lastFetched: string
    revalidate: number
  }
}

export const Layout = ({ children, debugInfo }: LayoutProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }

  return (
    <Box style={{ width: "100vw" }}>
      <Flex
        w="full"
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
      >
        <Head>
          <title>animegurafu</title>
        </Head>
        <Container maxW="container.xl" pb={8}>
          <Hero />

          {children}


        </Container>

      </Flex>

      <LayoutDrawer>
        <Box>
          デバッグ(revalidate): {debugInfo?.revalidate ?? null}
        </Box>
        <Box>
          デバッグ(lastGSP): {debugInfo?.lastGSP ?? null}
        </Box>
        <Box>
          デバッグ(lastFetched): {debugInfo?.lastFetched ?? null}
        </Box>
      </LayoutDrawer>

      <CTA />


      <Flex w="full" as="footer" pt={8} pb={20}>
        <Container>
          <Box>Distributed under MIT Lisence. The site owner do not own these anime stats.</Box>
        </Container>
      </Flex>
    </Box>
  )
}
