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

import { DarkModeSwitch } from '../components/common/DarkModeSwitch'
import { CTA } from '../components/layout/CTA'
import { Footer } from '../components/Footer'
import AnimeGraph from '@/components/anime-graph'
import Head from 'next/head'
import { Layout } from '@/components/layout'

import { FetchedData } from '@/models/firebase/Anime'
import dayjs from 'dayjs'

interface IndexProps {
  fetchedData: FetchedData
  lastGSP: Date
}

const Index = ({ fetchedData, lastGSP }: IndexProps) => {

  return (<>
    <Layout debugInfo={
      {
        lastGSP: lastGSP
      }
    }>

      <Head>
        <title>animegurafu</title>
      </Head>
      <Box>
        {(fetchedData.animesByScore && fetchedData.animesByPopularity) ? (
          <Box>
            <AnimeGraph dataFromFirebase={fetchedData} />
          </Box>) : (
            <Box>FAILED TO FETCH DATA</Box>
          )}
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
    </Layout>
  </>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {

  const secret = process.env.PAGES_MAL_API_SECRET

  const apiResult = await fetch(process.env.HTTPS_URL + `/api/mal/?secret=${secret}&mode=byscore`)
    .then(res => { return res.json() })
    .catch((e) => console.error(e))


  return {
    props: {
      lastGSP: new Date().toUTCString(),
      fetchedData: apiResult ?? null
    },
    revalidate: 900
  }
}
 /*

export default function Index() {return <Box>API準備中</Box>}

*/