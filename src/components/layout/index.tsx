import { Flex, useColorMode, FlexProps, Box, Center } from '@chakra-ui/react'
import { Main } from '../Main'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Hero } from '../Hero'

interface LayoutProps {
  children: ReactNode,
  flexProps?: FlexProps
}

export const Layout = ({ children }: LayoutProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }

  // important: DO NOT WRAP this Flex with any component!!!
  return (
  <Box w="full">
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
    >
      <Head>
        <title>animegurafu</title>
      </Head>
      <Box>
        <Hero />

          {children}


      </Box>

    </Flex>
  </Box>
  )
}
