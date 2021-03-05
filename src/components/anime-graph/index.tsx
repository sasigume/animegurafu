import ConvertForGraph from "@/lib/graph/convert"
import { FetchedData } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import { Box, Code, Divider } from "@chakra-ui/react"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeGraph = ({ dataFromFirebase }: AnimeGraphProps) => {

  const dataForGraph = ConvertForGraph(dataFromFirebase) as Converted

  if (!dataForGraph.byScore || !dataForGraph.byPopularity) {
    return <Box>DATA IS INVALID</Box>
  } else {
    return (
      <Box>
        <Box fontSize="0.6rem">Fetched: {(`${dataFromFirebase.lastFetched}`)}</Box>
        <Box fontSize="0.6rem">Converted: {(`${dataForGraph.lastConverted}`)}</Box>
        <Divider my={8} />
        <Box fontSize="2rem">スコア順</Box>
        <Box h="container.md" position="static">
          <Box fontSize="1.6rem">順位推移</Box>

          <NivoBump gds={dataForGraph.byScore.gdsForBump} mode="byscore" />
        </Box>
        <Divider my={8} />
        <Box h="container.md" position="static">
          <Box fontSize="1.6rem">数値推移</Box>
          <NivoLine gds={dataForGraph.byScore.gdsForLine} mode="byscore" />
        </Box>
        <Divider my={16} />
        <Box fontSize="2rem">人気順</Box>
        <Box h="container.md" position="static">
          <Box fontSize="1.6rem">順位推移</Box>

          <NivoBump gds={dataForGraph.byPopularity.gdsForBump} mode="bypopularity" />
        </Box>
        <Divider my={8} />
        <Box h="container.md" position="static">
          <Box fontSize="1.6rem">数値推移</Box>
          <NivoLine gds={dataForGraph.byPopularity.gdsForLine} mode="bypopularity" />
        </Box>
        <Divider my={16} />
        <Code>{JSON.stringify(dataForGraph)}</Code>
      </Box>

    )
  }
}

export default AnimeGraph