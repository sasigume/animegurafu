import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/Anime"
import { Converted, graphData, GraphType, Pos } from "@/models/graph/Converted"
import dayjs from "dayjs"


// Conver data into the structure shown below URL
// https://nivo.rocks/bump/

interface GDProps {
  animes: AnimeOnFirebase[]
  mode: Subtype
  graphType: GraphType
}

type ReturnGD = ({ animes, mode, graphType }: GDProps) => graphData[]

const GraphDatas: ReturnGD = ({ animes, mode, graphType }: GDProps) => {

  return animes.map((anime: AnimeOnFirebase) => {


    let inArray = anime.scoreArray
    if (mode == "bypopularity") {
      inArray = anime.membersArray
    }

    let positionArrayForLine: any = []
    let positionArrayForBump: any = []

    for (let key in inArray) {
      // Change pos of dot depends on mode
      let numberOfDateForLine: NumberOfDate = anime.scoreArray[key]
      let numberOfDateForBump: NumberOfDate = anime.rankOfScoreArray[key]

      if (mode == "bypopularity") {
        numberOfDateForLine = anime.membersArray[key]
        numberOfDateForBump = anime.rankOfPopularityArray[key]
      }

      let singlePosForLine = {
        x: Object.keys(numberOfDateForLine ?? '')[0],
        y: Object.values(numberOfDateForLine ?? 0)[0]
      }
      let singlePosForBump = {
        x: Object.keys(numberOfDateForBump ?? '')[0],
        y: Object.values(numberOfDateForBump ?? 0)[0]
      }

      if (singlePosForLine.x == undefined || singlePosForLine.y == undefined) {
        singlePosForLine.x = 'エラー'
      }
      if (singlePosForBump.x == undefined || singlePosForBump.y == undefined) {
        singlePosForBump.x = 'エラー'
      }

      positionArrayForLine.push(singlePosForLine)
      positionArrayForBump.push(singlePosForBump)
    }

    let data: Pos[] = positionArrayForLine

    if (graphType == "bump") {
      data = positionArrayForBump
    }

    return {
      id: `${anime.title_japanese}`,
      data: data
    }
  })
}

type Converter = (fetchedData: FetchedData) => Converted

const ConvertForGraph: Converter = (fetchedData) => {
  const gdsForLinePop = GraphDatas(
    {
      animes: fetchedData.animesByPopularity,
      mode: "bypopularity",
      graphType: "line"
    }
  )
  const gdsForBumpPop = GraphDatas(
    {
      animes: fetchedData.animesByPopularity,
      mode: "bypopularity",
      graphType: "line"
    }
  )
  const gdsForLineScore = GraphDatas(
    {
      animes: fetchedData.animesByScore,
      mode: "byscore",
      graphType: "line"
    }
  )
  const gdsForBumpScore = GraphDatas(
    {
      animes: fetchedData.animesByScore,
      mode: "byscore",
      graphType: "bump"
    }
  )

  const result = {
    lastConverted: dayjs().toDate(),
    byPopularity: {
      gdsForLine: gdsForLinePop,
      gdsForBump: gdsForBumpPop
    },
    byScore: {
      gdsForLine: gdsForLineScore,
      gdsForBump: gdsForBumpScore
    }
  }
  return result as Converted
}

export default ConvertForGraph