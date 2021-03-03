import { Anime } from "@/models/Anime"
import { AnimeData } from "@/models/AnimeData"
import { Box } from "@chakra-ui/react"

interface AnimeGraphProps {
  animeData: AnimeData[]
}

const AnimeGraph = ({animeData}:AnimeGraphProps) => {
  return (
    <Box>
    {animeData.map(
      (ad:AnimeData) => {
        <Box key={ad.date}>
          {ad.date}

          <Box>{
            ad.animes.map(
              (anime:Anime) =>
              <Box>
                {anime.title} / {anime.members}
              </Box>
            )}</Box>
        </Box>
      }
    )}
    </Box>
  )
}

export default AnimeGraph