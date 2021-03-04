import { Anime } from "@/models/firebase/Anime"
import { AnimeData } from "@/models/firebase/AnimeData"

const AnimeConvert = (animeDatas: AnimeData[]) => {

  function groupBy(objectArray: Anime[], key: string) {
    // https://stackoverflow.com/a/34890276
    let newArray = objectArray.reduce(function (acc: any, obj: any) {
      (acc[obj[key]] = acc[obj[key]] || []).push(obj)
      return acc
    }, {}
    )
    //console.log(newArray)
    return newArray
  }

  let scoreGroupByAnimeID = animeDatas.map((animeData: AnimeData) => {

    let animesArray = animeData.animes.map((anime: Anime) => {
      let data = {
        fetchDate: animeData.date,
        mal_id: anime.mal_id,
        date: animeData.date,
        score: anime.score,
        member: anime.members
      }
      let result: any = []
      result.push(data)
      return result
    })
    return Array.prototype.concat(...animesArray)
  })

  let wholeData = Array.prototype.concat(...scoreGroupByAnimeID)

  let resultByAnimeID = groupBy(wholeData, 'mal_id')

  let finalResult: any = []

  for (let key in resultByAnimeID) {
    let single = {
      mal_id: key,
      scores: resultByAnimeID[key].map(
        (data: any) => {
          return {
            fetchDate: data.fetchDate,
            score: data.score
          }
        }
      )
    }
    finalResult.push(single)
  }

  return finalResult
}

export default AnimeConvert