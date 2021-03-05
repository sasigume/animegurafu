import { Subtype } from "@/models/firebase/Anime"
import { Converted, graphData } from "@/models/graph/Converted"
import { Box } from "@chakra-ui/react"

import { ResponsiveBump } from '@nivo/bump'

interface GraphProps {
  mode: Subtype
  gds: graphData[]
}
const NivoBump = (props: GraphProps) => {
  return (
    <Box w="full" h="full">
      <ResponsiveBump
        data={props.gds}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={{ scheme: 'spectral' }}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.mode,
          legendPosition: 'middle',
          legendOffset: -40
        }}
      />
    </Box>
  )
}

export default NivoBump