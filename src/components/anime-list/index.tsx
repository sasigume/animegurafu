import ConvertForList from "@/lib/converter/for-list"
import { AnimeForGraph, FetchedData } from '@/models/index'
import {
  Box, Link, List, ListItem, Modal, ModalOverlay, SimpleGrid, Stack, useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react"
import LinkChakra from "../common/link-chakra"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeList = ({ dataFromFirebase }: AnimeGraphProps) => {

  const animes: AnimeForGraph[] = ConvertForList(dataFromFirebase)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!animes || animes.length < 0) {
    return <Box>DATA IS INVALID</Box>
  } else {

    return (
      <Stack style={{ maxWidth: "100vw" }} overflowX="scroll" spacing={2}>
        <Box as="h2" fontSize="2rem">追跡中のアニメ一覧</Box>
        <SimpleGrid width="600px" spacing={4} columns={5} flexWrap="wrap">
          {animes.map((anime: AnimeForGraph) => {
            return (
              <LinkChakra display="block" href={(`/animes/${anime.mal_id}`)} w="full" h="auto">
                <Flex w="90px" key={anime.mal_id}>
                  <img style={{ width: "full" }} src={anime.image_url} />
                </Flex>
              </LinkChakra>
            )
          })}
        </SimpleGrid>
      </Stack>

    )
  }
}

export default AnimeList