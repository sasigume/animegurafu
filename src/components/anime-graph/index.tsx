import ConvertForNivo from "@/lib/graph/convert"
import { AnimeOnFirebase, Subtype } from "@/models/firebase/Anime"
import { Box } from "@chakra-ui/react"

import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBump } from '@nivo/bump'

interface GraphProps {
  data: any,
  mode: Subtype
}
const MyResponsiveGraph = (props: GraphProps) => {
  let length = { min: 'auto', max: 'auto' } as any
  if (props.mode == "byscore") {
    length = {
      min: 0,
      max: 10
    }
  }
  return (
    <Box w="full" h="full">
      <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        //xScale={{ type: 'point' }}
        yScale={{ type: 'linear', reverse: false }}
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
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
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


interface AnimeGraphProps {
  animes: AnimeOnFirebase[]
  mode: Subtype
}

const AnimeGraph = ({ animes, mode }: AnimeGraphProps) => {

  // Conver data into the structure shown below URL
  // https://nivo.rocks/bump/

  const dataForGraph = ConvertForNivo(animes, mode)

  return (
    <Box h="container.lg" minHeight="lg" position="static">
      <MyResponsiveGraph data={dataForGraph} mode={mode} />
    </Box>
  )
}

export default AnimeGraph