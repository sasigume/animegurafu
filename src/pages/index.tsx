import { GetStaticProps } from 'next'
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import AnimeGraph from '@/components/anime-graph'

interface IndexProps {
  animeJson: any
}

const Index = ({ animeJson }: IndexProps) => {

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Box>
          <AnimeGraph animeData={animeJson} />
        </Box>
        <Text>
          Built with <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
      </Text>

        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
      </Main>

      <DarkModeSwitch />
      <Footer px={6}>
        <Text>Distributed under MIT Lisence. The site owner do not own these anime stats.</Text>
      </Footer>
      <CTA />
    </Container>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {

  const animeJson = [
    {
      date: "2021-1-1",
      animes:[
        {
          title:"hogegoe",
          members:"aaa"
        }
    ]}
  ]

  return {
    props: {
      animeJson: animeJson ?? null
    }
  }
}
