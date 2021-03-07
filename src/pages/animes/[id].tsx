import { GetStaticProps, } from 'next'
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
import Head from 'next/head'
import { Layout } from '@/components/layout'
import { AnimeForGraph, FetchedData } from '@/models/index'
import ConvertForList from '@/lib/converter/for-list'
import AnimeSingle from '@/components/anime-single'
import ConvertForSingle from '@/lib/converter/for-single'

interface AnimeIDPageProps {
  anime: AnimeForGraph
  fetchedTime: string
  lastGSP: Date
  revalEnv: number
}

const AnimeIDPage = ({ anime, fetchedTime, lastGSP, revalEnv }: AnimeIDPageProps) => {

  const animeConvertedForSingle = ConvertForSingle(anime)

  return (<>
    <Layout debugInfo={
      {
        lastGSP: lastGSP,
        lastFetched: fetchedTime,
        revalidate: revalEnv
      }
    }>

      <Head>
        <title>animegurafu</title>
      </Head>
      <Box>
        {anime ? (
          <>

            <AnimeSingle anime={animeConvertedForSingle} />

            <Divider my={12} />
          </>) : (
          <Box>FAILED TO FETCH DATA</Box>
        )}
      </Box>
      <Divider my={8} />
      <Text mb={8}>
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
    </Layout>
  </>
  )
}

export default AnimeIDPage

export const getStaticProps: GetStaticProps = async (context) => {

  let mal_id
  context.params ? mal_id = context.params.id : mal_id = null

  const secret = process.env.PAGES_MAL_API_SECRET

  const apiResult = await fetch(process.env.HTTPS_URL + `/api/mal/${mal_id}/?secret=${secret}&mode=byscore`)
    .then(res => { return res.json() })
    .catch((e) => console.error(e))

  let revalEnv = parseInt(process.env.REVALIDATE ?? '1800')
  return {
    props: {
      fetchedTime: apiResult.lastFetched ?? null,
      lastGSP: new Date().toUTCString(),
      anime: apiResult ?? null,
      revalEnv: revalEnv
    },
    revalidate: revalEnv
  }
}

export async function getStaticPaths() {

  const secret = process.env.PAGES_MAL_API_SECRET

  const apiResult: FetchedData = await fetch(process.env.HTTPS_URL + `/api/mal/?secret=${secret}&mode=byscore`)
    .then(res => { return res.json() })
    .catch((e) => console.error(e))

  const paths = ConvertForList(apiResult).map((anime: AnimeForGraph) => `/animes/${anime.mal_id}`)
  return {
    paths: paths,
    fallback: true
  }
}
 /*

export default function AnimesPage() {return <Box>API準備中</Box>}

*/