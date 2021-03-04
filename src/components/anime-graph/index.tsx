import ConvertForGraph from "@/lib/graph/convert"
import { AnimeOnFirebase, Subtype } from "@/models/firebase/Anime"
import { Box, Divider } from "@chakra-ui/react"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"
import VictoryLine from "./victory/victory-line"

interface AnimeGraphProps {
  animes: AnimeOnFirebase[]
  mode: Subtype
}

const AnimeGraph = ({ animes, mode }: AnimeGraphProps) => {

  const dataForGraph = ConvertForGraph(animes, mode)

  return (
    <Box>
      {/*
      // BUMP IS BROKEN
      <Box h="container.md" position="static">
        <NivoBump data={dataForGraph} mode={mode} />
  </Box> */}
      <Box h="container.md" position="static">
        <NivoLine data={dataForGraph} mode={mode} />
      </Box>
      <Divider my={16} />
      {/*<Box h="container.md" position="static">
        <VictoryLine data={dataForGraph} mode={mode} />
</Box>*/}
    </Box>
  )
}

export default AnimeGraph