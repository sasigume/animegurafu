import { AnimeOnFirebase, NumberOfDate, Subtype } from "@/models/firebase/Anime"

const ConvertForNivo = (animes: AnimeOnFirebase[], mode: Subtype) => {
  const convertedData = animes.map((anime: AnimeOnFirebase) => {
    let positionArray: any = []
    for (let key in anime.scoreArray) {
      // Change pos of dot depends on mode
      let numberOfDate: NumberOfDate = anime.scoreArray[key]
      if (mode == "bypopularity") {
        numberOfDate = anime.membersArray[key]
      }
      let singlePos = {
        x: Object.keys(numberOfDate)[0],
        y: Object.values(numberOfDate)[0]
      }
      positionArray.push(singlePos)
    }

    return {
      id: `${anime.title_japanese}`,
      data: positionArray
    }
  })

  return convertedData
}

export default ConvertForNivo