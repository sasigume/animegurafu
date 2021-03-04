import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/Anime"
import { Converted } from "@/models/graph/Converted"
import dayjs from "dayjs"


  // Conver data into the structure shown below URL
  // https://nivo.rocks/bump/

const ConvertForGraph = (data:FetchedData) => {
  const convertedData = data.animes.map((anime: AnimeOnFirebase) => {

    let inArray = anime.scoreArray
    if (data.mode == "bypopularity") {
      inArray = anime.membersArray
    }

    let positionArray: any = []
    for (let key in inArray) {
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
    }

    return {
      id: `${anime.title_japanese}`,
      data: positionArray
    }
  })

  // this returns only int rank
  const convertedDataForBump = data.animes.map((anime: AnimeOnFirebase) => {
    let positionArrayForBump: any = []

    let inArray = anime.rankOfScoreArray
    
    if (data.mode == "bypopularity") {
      inArray = anime.rankOfPopularityArray
    }

    for (let key in inArray) {
      // Change pos of dot depends on mode
      let numberOfDate: NumberOfDate = anime.rankOfScoreArray[key]
      
      if (data.mode == "bypopularity") {
        numberOfDate = anime.rankOfPopularityArray[key]
      }
      let singlePos = {
        x: Object.keys(numberOfDate)[0],
        y: Object.values(numberOfDate)[0]
      }
      
      positionArrayForBump.push(singlePos)
    }

    return {
      id: `${anime.title_japanese}`,
      data: positionArrayForBump
    }
  })

  return {
    mode: data.mode,
    lastConverted: dayjs().toDate(),
    animes: convertedData,
    animesForBump: convertedDataForBump
  } as Converted
}

export default ConvertForGraph