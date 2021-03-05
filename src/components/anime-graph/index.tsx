import ConvertForGraph from "@/lib/graph/convert"
import { FetchedData } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import { Box, Checkbox, Code, Divider, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, useSlider } from "@chakra-ui/react"
import { useState } from "react"
import CodeAccordion from "../common/code-accordion"
import NivoBump from "./nivo/nivo-bump"
import NivoLine from "./nivo/nivo-line"

interface AnimeGraphProps {
  dataFromFirebase: FetchedData
}

const AnimeGraph = ({ dataFromFirebase }: AnimeGraphProps) => {

  const dataForGraph = ConvertForGraph(dataFromFirebase) as Converted

  let limitBySlider = 50

  const [checkedItems, setCheckedItems] = useState([true,true,true,true])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  if (!dataForGraph.byScore || !dataForGraph.byPopularity) {
    return <Box>DATA IS INVALID</Box>
  } else {

    console.info(`RECEIVED: ${dataForGraph}`)

    return (
      <Box>
        <Box fontSize="2rem">※JikanAPIが1日データをキャッシュするので、取得タイミングのせいでグラフが平らになっているかもしれません。</Box>
        <Box fontSize="1rem">Fetched: {(`${dataFromFirebase.lastFetched}`)}</Box>
        <Box fontSize="1rem">Converted: {(`${dataForGraph.lastConverted}`)}</Box>
        <Divider my={8} />
        <Slider aria-label="slider-ex-5" min={1} max={50} step={1} defaultValue={50} onChangeEnd={(val) => limitBySlider = val}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Divider my={8} />
        {limitBySlider}
        <Stack>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
          >
            全選択
      </Checkbox>
          <Stack spacing={3} pl={6}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2], checkedItems[3]])}
            >1</Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2], checkedItems[3]])}
            >2 </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked, checkedItems[3]])}
            >3</Checkbox>
            <Checkbox
              isChecked={checkedItems[3]}
              onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], e.target.checked])}
            >4</Checkbox>
          </Stack>
        </Stack>
        <Divider my={8} />
        <Box fontSize="2rem">スコア順</Box>
        {checkedItems[0] && (
          <>
            <Box h="container.md" position="static">
              <Box fontSize="1.6rem">順位推移</Box>

              <NivoBump gds={dataForGraph.byScore.gdsForBump} mode="byscore" />
            </Box>
            <Divider my={8} />
          </>
        )}
        {checkedItems[1] && (
          <>
            <Box h="container.md" position="static">
              <Box fontSize="1.6rem">数値推移</Box>
              <NivoLine gds={dataForGraph.byScore.gdsForLine} mode="byscore" />
            </Box>
            <Divider my={16} />
          </>
        )}

        <Box fontSize="2rem">人気順</Box>
        {checkedItems[2] && (
          <>
            <Box h="container.md" position="static">
              <Box fontSize="1.6rem">順位推移</Box>

              <NivoBump gds={dataForGraph.byPopularity.gdsForBump} mode="bypopularity" />
            </Box>
            <Divider my={8} />
          </>
        )}
        {checkedItems[3] && (
          <>
            <Box h="container.md" position="static">
              <Box fontSize="1.6rem">数値推移</Box>
              <NivoLine gds={dataForGraph.byPopularity.gdsForLine} mode="bypopularity" />
            </Box>
          </>
        )}
        <Divider my={16} />
        <CodeAccordion data={dataForGraph} />
      </Box>

    )
  }
}

export default AnimeGraph