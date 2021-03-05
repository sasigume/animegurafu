import { Flex, useColorMode, FlexProps, Box, Center, Container } from '@chakra-ui/react'
import { Main } from '../Main'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Hero } from '../Hero'
import LayoutDrawer from './layout-drawer'
import { CTA } from './CTA'

interface LayoutProps {
  children: ReactNode,
  debugInfo?: {
    lastGSP: Date
  }
}

export const Layout = ({ children, debugInfo }: LayoutProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }

  // important: DO NOT WRAP this Flex with any component!!!
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
        <Container maxW="container.xl">
          <Hero />

          {children}


        </Container>

      </Flex>

      <LayoutDrawer>
        <Box>
          デバッグ(lastGSP): {debugInfo?.lastGSP ?? null}
        </Box>
      </LayoutDrawer>

      <CTA />
    </Box>
  )
}
