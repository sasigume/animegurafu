import { AnimeForGraph, AnimeForSingle } from "@/models/index"
import { Box, Divider, Flex } from "@chakra-ui/layout"

interface Props {
  anime: AnimeForSingle
}

const AnimeSingle = ({ anime }: Props) => {
  return (
    <Box>
      <Box as="h2" fontSize="2rem" fontWeight="bold">{anime.title_japanese}</Box>
      <Divider my={6} />
      <Flex>
        <img style={{ width: "full" }} src={anime.image_url} />
      </Flex>
      
    </Box>
  )
}

export default AnimeSingle