import { AnimeOnFirebase, NumberOfDate, Subtype } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"


  // Conver data into the structure shown below URL
  // https://nivo.rocks/bump/

const ConvertForGraph = (animes: AnimeOnFirebase[], mode: Subtype) => {
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
        y: parseFloat(Object.values(numberOfDate)[0])
      }
      
      positionArray.push(singlePos)

      /*let singlePos2 = {
        x: Object.keys(numberOfDate)[0]+1,
        y: parseFloat(Object.values(numberOfDate)[0]) - 1
      }

      // testing
      positionArray.push(singlePos2) */
    }

    return {
      id: `${anime.title_japanese}`,
      data: positionArray
    }
  })

  return convertedData as Converted
}

export default ConvertForGraph