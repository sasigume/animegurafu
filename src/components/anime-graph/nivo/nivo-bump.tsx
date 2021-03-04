import { Converted } from "@/models/graph/Converted"
import { Box } from "@chakra-ui/react"

import { ResponsiveBump } from '@nivo/bump'

interface GraphProps {
  data: Converted
}
const NivoBump = (props: GraphProps) => {
  let length = { min: 'auto', max: 'auto' } as any
  if (props.data.mode == "byscore") {
    length = {
      min: 0,
      max: 10
    }
  }
  return (
    <Box w="full" h="full">
      <ResponsiveBump
        data={props.data.animesForBump}
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
          legend: props.data.mode,
          legendPosition: 'middle',
          legendOffset: -40
        }}
      />
    </Box>
  )
}

export default NivoBump