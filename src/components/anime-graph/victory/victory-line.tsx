import { Subtype } from "@/models/firebase/Anime"
import { Converted, graphData } from "@/models/graph/Converted";
import { Box } from "@chakra-ui/react"

import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter
} from 'victory';

interface GraphProps {
  data: Converted,
  mode: Subtype
}
const Line = (props: GraphProps) => {
  let length = { min: 'auto', max: 'auto' } as any
  if (props.mode == "byscore") {
    length = {
      min: 0,
      max: 10
    }
  }

  const vono = (<VictoryVoronoiContainer
    voronoiDimension="x"
    labels={({ datum }) => `y: ${datum.y}`}
    labelComponent={<VictoryTooltip cornerRadius={0}
      flyoutStyle={{ fill: "white" }} />}
  />)

  return (
    <Box w="full" h="full">
      <VictoryChart height={400} width={400}
        containerComponent={vono}
      >
        {props.data.animes.map((gd: graphData) => {

          return (
            <VictoryGroup
              color="#c43a31"
              data={gd.data}
              style={{
                data: { stroke: "tomato", strokeWidth: ({ active }) => active ? 4 : 2 },
                labels: { fontSize:"0.2rem" ,fill: "tomato" }
              }}
            >
              <VictoryLine />
              <VictoryScatter
                size={({ active }) => active ? 8 : 3}
              />
            </VictoryGroup>
          )

        }
        )}
      </VictoryChart>
    </Box>
  )
}

export default Line