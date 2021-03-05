import { Flex, useColorMode, FlexProps, Box, Center, Container, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Hero } from '../Hero'
import LayoutDrawer from './layout-drawer'
import { CTA } from './CTA'
import { DarkModeSwitch } from '../common/DarkModeSwitch'

interface LayoutProps {
  children: ReactNode,
  debugInfo?: {
    lastGSP: Date
    lastFetched: string
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
        <Container maxW="container.xl">
          <Hero />

          {children}


        </Container>

      </Flex>

      <LayoutDrawer>
        <Box>
          デバッグ(lastGSP): {debugInfo?.lastGSP ?? null}
        </Box>
        <Box>
          デバッグ(lastFetched): {debugInfo?.lastFetched ?? null}
        </Box>
      </LayoutDrawer>

      <CTA />


      <Flex as="footer" py="8rem">
        <Text>Distributed under MIT Lisence. The site owner do not own these anime stats.</Text>
      </Flex>
    </Box>
  )
}
