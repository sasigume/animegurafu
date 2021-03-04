import { Flex, useColorMode, FlexProps, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Hero } from '../Hero'

interface LayoutProps {
  children: ReactNode,
  flexProps?: FlexProps
}

export const Layout = ({ children, flexProps }: LayoutProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }

  // important: DO NOT WRAP this Flex with any component!!!
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...flexProps}
    >
      <Head>
        <title>animegurafu</title>
      </Head>
      <Hero />

      {children}

    </Flex>
  )
}
