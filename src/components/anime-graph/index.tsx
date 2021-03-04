import ConvertForGraph from "@/lib/graph/convert"
import { FetchedData } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import { Box, Divider } from "@chakra-ui/react"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeGraph = ({ dataFromFirebase }: AnimeGraphProps) => {

  const dataForGraph: Converted = ConvertForGraph(dataFromFirebase)

  return (
    <Box>
      <Box fontSize="0.6rem">Fetched: {(`${dataFromFirebase.lastFetched}`)}</Box>
      <Box fontSize="0.6rem">Converted: {(`${dataForGraph.lastConverted}`)}</Box>
      <Divider my={8} />
      <Box fontSize="2rem">{dataFromFirebase.mode == "byscore" ? "スコア順" : "人気順"}</Box>
      <Box h="container.md" position="static">
        <Box fontSize="1.6rem">順位推移</Box>

        <NivoBump data={dataForGraph} />
      </Box>
      <Divider my={8} />
      <Box h="container.md" position="static">
        <Box fontSize="1.6rem">数値推移</Box>
        <NivoLine data={dataForGraph} />
      </Box>
      <Divider my={16} />
    </Box>

  )
}

export default AnimeGraph