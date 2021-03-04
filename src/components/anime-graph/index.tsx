import { AnimeOnFirebase } from "@/models/firebase/Anime"
import { Box, Divider } from "@chakra-ui/react"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnimeGraphProps {
  animes: AnimeOnFirebase[]
}

const AnimeGraph = ({ animes }: AnimeGraphProps) => {

  
  return (
    <Box>

      {/*DataArray.map(
        (DA: any) => {
          return (
            <Box key={ad.date}>
              <Box fontSize="1.7rem"><h3>{ad.date}</h3></Box>

              <Box>{ad.animes.map((anime: Anime) =>
                <Box key={anime.mal_id}>
                  <LineChart
                    width={500}
                    height={300}
                    data={ad}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />

                  </LineChart>
                </Box>
              )}</Box>

              <Divider />
              <Box>{
                ad.animes.map(
                  (anime: Anime) =>
                    <Box key={anime.mal_id}>
                      {anime.score} / {anime.members}
                    </Box>
                )}</Box>
            </Box>
          )
        }
      )*/}
    </Box>
  )
}

export default AnimeGraph