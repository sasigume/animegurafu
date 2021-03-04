import ConvertForGraph from "@/lib/graph/convert"
import { FetchedData } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import { Box, Divider } from "@chakra-ui/react"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"
import VictoryLine from "./victory/victory-line"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeGraph = ({ dataFromFirebase }: AnimeGraphProps) => {

  const dataForGraph: Converted = ConvertForGraph(dataFromFirebase)

  return (
    <Box>
      <Box fontSize="2rem">{dataFromFirebase.mode == "byscore" ? "スコア順" : "人気順"}</Box>
      {
        // BUMP IS BROKEN
        <Box h="container.md" position="static">
          <NivoBump data={dataForGraph} />
        </Box>}
      {/*
      <Box h="container.md" position="static">
        <NivoLine data={dataForGraph} />
      </Box>*/}
      <Divider my={16} />
      {/*<Box h="container.md" position="static">
        <VictoryLine data={dataForGraph} />
</Box>*/}
    </Box>
  )
}

export default AnimeGraph