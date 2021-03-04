import { GetStaticProps } from 'next'
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Divider,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import AnimeGraph from '@/components/anime-graph'
import Head from 'next/head'
import { Layout } from '@/components/layout'

import { FetchedData } from '@/models/firebase/Anime'

interface IndexProps {
  dataByScore: FetchedData
  dataByPopularity: FetchedData
}

const Index = ({ dataByScore, dataByPopularity }: IndexProps) => {

  return (<>
    <Layout>

      <Head>
        <title>animegurafu</title>
      </Head>
        <Box>
          <AnimeGraph dataFromFirebase={dataByScore} />
          <Divider />
          <AnimeGraph dataFromFirebase={dataByPopularity} />
        </Box>
        <Divider my={8} />
        <Text>
          Built with <Code>Next.js</Code> + <Code>chakra-ui</Code> + <Code>firebase</Code> + <Code>nivo</Code> +{' '}
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

      <DarkModeSwitch />
      <Footer px={6}>
        <Text>Distributed under MIT Lisence. The site owner do not own these anime stats.</Text>
      </Footer>
      <CTA />
    </Layout>
  </>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {

  const secret = process.env.PAGES_MAL_API_SECRET

  const apiResultByscore = await fetch(process.env.HTTPS_URL + `/api/mal/?secret=${secret}&mode=byscore`)
  const apiResultBypopularity = await fetch(process.env.HTTPS_URL + `/api/mal/?secret=${secret}&mode=bypopularity`)

  const json = {
    byscore: await apiResultByscore.json(),
    bypopularity: await apiResultBypopularity.json()
  }
 
  return {
    props: {
      dataByScore: json.byscore ?? null,
      dataByPopularity: json.bypopularity ?? null
    }
  }
}
