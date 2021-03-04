import { Anime } from "@/models/firebase/Anime"
import { AnimeData } from "@/models/firebase/AnimeData"
import { Box } from "@chakra-ui/react"

interface AnimeGraphProps {
  animeDatas?: AnimeData[]
}

const AnimeGraph = ({ animeDatas }: AnimeGraphProps) => {
  return (
    <Box>
      {(animeDatas && animeDatas?.length > 0) && animeDatas.map(
        (ad: AnimeData) => {
          return (
            <Box key={ad.date}>
              {ad.date}
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
      )}
    </Box>
  )
}

export default AnimeGraph