import { Anime } from "@/models/firebase/Anime"
import { AnimeData } from "@/models/firebase/AnimeData"
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
              <Box key={anime.mal_id}>
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