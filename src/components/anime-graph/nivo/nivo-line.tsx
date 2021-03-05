import { Subtype } from "@/models/firebase/Anime"
import { Converted, graphData } from "@/models/graph/Converted"
import { Box } from "@chakra-ui/react"

import { ResponsiveLine } from '@nivo/line'
import dayjs from "dayjs"

interface GraphProps {
  gds: graphData[],
  mode: Subtype
}
const NivoLine = (props: GraphProps) => {
  let length = { min: 0, max: 3000000 } as any
  if (props.mode == "byscore") {
    length = {
      min: 0,
      max: 10
    }
  }
  return (
    <Box w="full" h="full">
      <ResponsiveLine
        data={props.gds}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '日付',
          legendOffset: 36,
          legendPosition: 'middle',
          format: function (value: string) {
            return dayjs(value).format('MM月DD日')
          },
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.mode,
          legendOffset: -50,
          legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </Box>
  )
}

export default NivoLine