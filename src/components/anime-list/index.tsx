import ConvertForList from "@/lib/animelist/convert-for-list"
import { AnimeForList } from "@/models/animelist/ConvertedForList"
import { FetchedData } from "@/models/firebase/FetchedData"
import {
  Box, Link, List, ListItem, Modal, ModalOverlay, SimpleGrid, Stack, useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeList = ({ dataFromFirebase }: AnimeGraphProps) => {

  const animes: AnimeForList[] = ConvertForList(dataFromFirebase)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!animes || animes.length < 0) {
    return <Box>DATA IS INVALID</Box>
  } else {

    return (
      <Stack style={{ maxWidth: "100vw" }} overflowX="scroll" spacing={2}>
        <Box as="h2" fontSize="2rem">追跡中のアニメ一覧</Box>
        <SimpleGrid width="900px" spacing={4} columns={5} flexWrap="wrap">
          {animes.map((anime: AnimeForList) => {
            return (

              <Box w="160px" key={anime.mal_id}>

                <Button onClick={onOpen} isExternal href={anime.url} target="_blank" w="full" h="auto">
                  <img style={{ width: "full" }} src={anime.image_url} />
                </Button>


                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <List>
                        <ListItem>(ID: {anime.mal_id})</ListItem>
                        <ListItem>SCORE: {anime.score}</ListItem>
                        <ListItem>MEMBERS: {anime.members}</ListItem>
                      </List>
                    </ModalBody>

                    <ModalFooter>
                    <Link href={anime.url} variant="ghost" isExternal>MyAnimeListの詳細ページへ</Link>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        閉じる</Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>

              </Box>
            )
          })}
        </SimpleGrid>
      </Stack>

    )
  }
}

export default AnimeList