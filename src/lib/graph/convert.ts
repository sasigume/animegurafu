import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/FetchedData"
import { Converted, graphData, GraphType, Pos } from "@/models/graph/Converted"
import { randomColor } from "@chakra-ui/theme-tools"
import dayjs from "dayjs"


// Conver data into the structure shown below URL
// https://nivo.rocks/bump/

/* ---------------------------
  // IMPORTANT: SORT AND REMOVE DUPLICATED DATA
  // https://stackoverflow.com/a/60716511/15161394
  // https://stackoverflow.com/a/60737337/15161394
  ------------------------------*/

const optimizePos = (posArray: Pos[]) => {
  const posWithoutDuplicate: any = {}
  for (const item of posArray) {
    posWithoutDuplicate[item.x] = item;
  }
  const datasWithoutDuplicate = Object.values(posWithoutDuplicate) as any

  const orderedPosArray: any = {};
  Object.keys(datasWithoutDuplicate).sort(function (a, b) {
    return a.localeCompare(b)
  }).forEach(function (key) {
    orderedPosArray[key] = datasWithoutDuplicate[key]
  })

  return Object.values(orderedPosArray)
}

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
        x: dayjs(Object.keys(numberOfDateForLine ?? '')[0]).format('YYYYMMDD'),
        y: Object.values(numberOfDateForLine ?? 0)[0]
      }

      if (singlePosForLine.x == undefined || singlePosForLine.y == undefined) {
        singlePosForLine.x = '20210304'
      }


      positionArrayForLine.push(singlePosForLine)
    }

    return {
      id: `${anime.title_japanese}`,
      data: optimizePos(positionArrayForLine) as Pos[],
      color: anime.color ?? '#000'
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
        x: dayjs(Object.keys(numberOfDateForBump ?? '')[0]).format('YYYYMMDD'),
        y: Object.values(numberOfDateForBump ?? 0)[0]
      }

      if (singlePosForBump.x == undefined || singlePosForBump.y == undefined) {
        singlePosForBump.x = '20210304'
      }

      positionArrayForBump.push(singlePosForBump)
    }

    return {
      id: `${anime.title_japanese}(ID:${anime.mal_id})`,
      data: optimizePos(positionArrayForBump) as Pos[],
      color: anime.color ?? '#000'
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

  const sampleLength = gdsForBumpScore[0].data.length

  const result = (slice: number) => {
    return {
      lastConverted: dayjs().toDate(),
      sampleLength: sampleLength,

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