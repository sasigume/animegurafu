import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import dayjs from "dayjs"


  // Conver data into the structure shown below URL
  // https://nivo.rocks/bump/

const ConvertForGraph = (data:FetchedData) => {
  const convertedData = data.animes.map((anime: AnimeOnFirebase) => {
    let positionArray: any = []
    for (let key in anime.scoreArray) {
      // Change pos of dot depends on mode
      let numberOfDate: NumberOfDate = anime.scoreArray[key]
      
      if (data.mode == "bypopularity") {
        numberOfDate = anime.membersArray[key]
      }
      let singlePos = {
        x: Object.keys(numberOfDate)[0],
        y: Object.values(numberOfDate)[0]
      }
      
      positionArray.push(singlePos)

      let singlePos2 = {
        x: Object.keys(numberOfDate)[0],
        y: Object.values(numberOfDate)[0] + 1
      }

      // testing
      positionArray.push(singlePos2)

      console.log(positionArray)
    }

    return {
      id: `${anime.title_japanese}`,
      data: positionArray
    }
  })

  return {
    mode: data.mode,
    date: dayjs().format('YYYY-MM-DD'),
    animes: convertedData
  } as Converted
}

export default ConvertForGraph