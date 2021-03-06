import ConvertForList from "@/lib/animelist/convert-for-list"
import { AnimeForList } from "@/models/animelist/ConvertedForList"
import { FetchedData } from "@/models/firebase/FetchedData"
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Divider, Flex, Image, Link, List, ListItem, SimpleGrid, Stack, } from "@chakra-ui/react"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeList = ({ dataFromFirebase }: AnimeGraphProps) => {

  const animes: AnimeForList[] = ConvertForList(dataFromFirebase)

  if (!animes || animes.length < 0) {
    return <Box>DATA IS INVALID</Box>
  } else {

    return (
      <Stack style={{maxWidth:"100vw"}} overflowX="scroll" spacing={2}>
        <Box as="h2" fontSize="2rem">追跡中のアニメ一覧</Box>
        <SimpleGrid width="900px" spacing={4} columns={5} flexWrap="wrap">
          {animes.map((anime: AnimeForList) => {
            return (

              <Box w="160px" key={anime.mal_id}>
                
                <Link isExternal href={anime.url} target="_blank" w="full" h="auto"><img style={{width:"full"}} src={anime.image_url} /></Link>
                {/*<List>
                  <ListItem>(ID: {anime.mal_id})</ListItem>
                  <ListItem>SCORE: {anime.score}</ListItem>
                  <ListItem>MEMBERS: {anime.members}</ListItem>
                </List>*/}

              </Box>
            )
          })}
        </SimpleGrid>
      </Stack>

    )
  }
}

export default AnimeList