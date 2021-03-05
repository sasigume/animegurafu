import ConvertForGraph from "@/lib/graph/convert"
import { FetchedData } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import { Box, Divider, } from "@chakra-ui/react"
import CodeAccordion from "../common/code-accordion"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeGraph = ({ dataFromFirebase }: AnimeGraphProps) => {

  const dataForGraph: Converted = ConvertForGraph(dataFromFirebase)

  let length = dataForGraph.sampleLength

  if (!dataForGraph.byScore || !dataForGraph.byPopularity) {
    return <Box>DATA IS INVALID</Box>
  } else {

    console.info(`RECEIVED: ${JSON.stringify(dataForGraph)}`)

    return (
      <Box style={{maxWidth:"100vw"}} overflowX="scroll">
        <Box fontSize="1rem">※JikanAPIが1日データをキャッシュするので、取得タイミングのせいでグラフが平らになっているかもしれません。</Box>
        <Box>Length: {length}</Box>
        <Box fontSize="1rem">Fetched: {(`${dataFromFirebase.lastFetched}`)}</Box>
        <Box fontSize="1rem">Converted: {(`${dataForGraph.lastConverted}`)}</Box>
        <Divider my={8} />
        <Box fontSize="2rem">スコア順</Box>
        <>
          <Box w={length*200} h="container.xl" position="static">
            <Box fontSize="1.6rem">順位推移</Box>

            <NivoBump gds={dataForGraph.byScore.gdsForBump} mode="byscore" />
          </Box>
          <Divider my={8} />
        </>

        <>
          <Box w={length*200} h="container.xl" position="static">
            <Box fontSize="1.6rem">数値推移</Box>
            <NivoLine gds={dataForGraph.byScore.gdsForLine} mode="byscore" />
          </Box>
          <Divider my={16} />
        </>


        <Box fontSize="2rem">人気順</Box>

        <>
          <Box w={length*200} h="container.xl" position="static">
            <Box fontSize="1.6rem">順位推移</Box>

            <NivoBump gds={dataForGraph.byPopularity.gdsForBump} mode="bypopularity" />
          </Box>
          <Divider my={8} />
        </>

        <>
          <Box w={length*200} h="container.xl" position="static">
            <Box fontSize="1.6rem">数値推移</Box>
            <NivoLine gds={dataForGraph.byPopularity.gdsForLine} mode="bypopularity" />
          </Box>
        </>

        <Divider my={16} />
        <CodeAccordion data={dataForGraph} />
      </Box>

    )
  }
}

export default AnimeGraph