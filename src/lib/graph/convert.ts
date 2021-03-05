import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/Anime"
import { Converted, graphData, GraphType, Pos } from "@/models/graph/Converted"
import dayjs from "dayjs"


// Conver data into the structure shown below URL
// https://nivo.rocks/bump/

interface GDProps {
  animes: AnimeOnFirebase[]
  mode: Subtype
}

type ReturnGD = ({ animes, mode }: GDProps) => graphData[]

const GraphDatasForLine: ReturnGD = ({ animes, mode }: GDProps) => {

  return animes.map((anime: AnimeOnFirebase) => {


    let inArray = anime.scoreArray
    if (mode == "bypopularity") {
      inArray = anime.membersArray
    }

    let positionArrayForLine: any = []

    for (let key in inArray) {
      let numberOfDateForLine: NumberOfDate = anime.scoreArray[key]

      if (mode == "bypopularity") {
        numberOfDateForLine = anime.membersArray[key]
      }

      let singlePosForLine = {
        x: Object.keys(numberOfDateForLine ?? '')[0],
        y: Object.values(numberOfDateForLine ?? 0)[0]
      }

      if (singlePosForLine.x == undefined || singlePosForLine.y == undefined) {
        singlePosForLine.x = '2021-03-04'
      }


      positionArrayForLine.push(singlePosForLine)
    }

     /* ---------------------------
    // IMPORTANT: REMOVE DUPLICATED DATA
    // https://stackoverflow.com/a/60716511/15161394
    ------------------------------*/

    const posWithoutDuplicate:any = {}
    for (const item of positionArrayForLine) {
      posWithoutDuplicate[item.x] = item;
    }
    const datasWithoutDuplicate = Object.values(posWithoutDuplicate);

    return {
      id: `${anime.title_japanese}`,
      data: datasWithoutDuplicate as Pos[]
    } 
  })
}

const GraphDatasForBump: ReturnGD = ({ animes, mode }: GDProps) => {

  return animes.map((anime: AnimeOnFirebase) => {


    let inArray = anime.scoreArray
    if (mode == "bypopularity") {
      inArray = anime.membersArray
    }

    let positionArrayForBump: any = []


    for (let key in inArray) {
      let numberOfDateForBump: NumberOfDate = anime.rankOfScoreArray[key]

      if (mode == "bypopularity") {
        numberOfDateForBump = anime.rankOfPopularityArray[key]
      }

      let singlePosForBump = {
        x: Object.keys(numberOfDateForBump ?? '')[0],
        y: Object.values(numberOfDateForBump ?? 0)[0]
      }

      if (singlePosForBump.x == undefined || singlePosForBump.y == undefined) {
        singlePosForBump.x = '2021-03-04'
      }

      positionArrayForBump.push(singlePosForBump)
    }

   
    const posWithoutDuplicate:any = {}
    for (const item of positionArrayForBump) {
      posWithoutDuplicate[item.x] = item;
    }
    const datasWithoutDuplicate = Object.values(posWithoutDuplicate);

    return {
      id: `${anime.title_japanese}`,
      data: datasWithoutDuplicate as Pos[]
    }
  })
}

type Converter = (fetchedData: FetchedData) => Converted

const ConvertForGraph: Converter = (fetchedData) => {

  const gdsForBumpScore = GraphDatasForBump(
    {
      animes: fetchedData.animesByScore,
      mode: "byscore",
    }
  )
  const gdsForLineScore = GraphDatasForLine(
    {
      animes: fetchedData.animesByScore,
      mode: "byscore",
    }
  )
  const gdsForBumpPop = GraphDatasForBump(
    {
      animes: fetchedData.animesByPopularity,
      mode: "bypopularity",
    }
  )
  const gdsForLinePop = GraphDatasForLine(
    {
      animes: fetchedData.animesByPopularity,
      mode: "bypopularity",
    }
  )

  const result = (slice: number) => {
    return {
      lastConverted: dayjs().toDate(),

      byScore: {
        gdsForBump: gdsForBumpScore.slice(0, slice),
        gdsForLine: gdsForLineScore.slice(0, slice)
      },

      byPopularity: {
        gdsForBump: gdsForBumpPop.slice(0, slice),
        gdsForLine: gdsForLinePop.slice(0, slice)
      }
    }
  }

  let finalSlice = 50
  return result(finalSlice) as Converted
}

export default ConvertForGraph