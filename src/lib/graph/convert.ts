import { AnimeOnFirebase, FetchedData, NumberOfDate, Subtype } from "@/models/firebase/FetchedData"
import { Converted, graphData, Pos } from "@/models/graph/Converted"
import dayjs from "dayjs"


// Conver data into the structure shown below URL
// https://nivo.rocks/bump/

/* ---------------------------
  // IMPORTANT: SORT AND REMOVE DUPLICATED DATA
  // https://stackoverflow.com/a/60716511/15161394
  // https://stackoverflow.com/a/60737337/15161394
  ------------------------------*/

const optimizePos = (posArray: Pos[]) => {
  let posWithoutDuplicate: any = {}
  for (let item of posArray) {
    posWithoutDuplicate[item.x] = item
  }
  const datasWithoutDuplicate = Object.values(posWithoutDuplicate) as any

  return datasWithoutDuplicate.sort((a: Pos, b: Pos) => (dayjs(a.x).toDate() < dayjs(b.x).toDate()) ? -1 : ((dayjs(b.x).toDate() > dayjs(a.x).toDate()) ? 1 : 0))
}

interface GDProps {
  animes: AnimeOnFirebase[]
  mode: Subtype
}

type ReturnGD = ({ animes, mode }: GDProps) => Converted

const BROKEN_DATA = process.env.BROKEN_DATA?.split(',') ?? []

function containBrokenData(target: string) {
  var value = 0;
  BROKEN_DATA.forEach(function (env) {
    target.includes(dayjs(env).format('YYYY-MM-DD')) && value++
  });
  return (value === 1)
}

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
      let singlePosForLine

      singlePosForLine = {
        x: dayjs(Object.keys(numberOfDateForLine ?? '')[0]).format('YYYY-MM-DD'),
        y: Object.values(numberOfDateForLine ?? 0)[0]
      }
      if (containBrokenData(singlePosForLine.x)) {
        positionArrayForLine.push()
      } else {
        positionArrayForLine.push(singlePosForLine)
      }
    }

    return {
      id: `${anime.title_japanese}(ID:${anime.mal_id})`,
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
        x: dayjs(Object.keys(numberOfDateForBump ?? '')[0]).format('YYYY-MM-DD'),
        y: Object.values(numberOfDateForBump ?? 0)[0]
      }

      if (containBrokenData(singlePosForBump.x)) {
        positionArrayForBump.push()
      } else {
        positionArrayForBump.push(singlePosForBump)
      }
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

  const result = (slice: number) => {

    return {
      ignoredDates: BROKEN_DATA,
      lastConverted: dayjs().toDate(),
      sampleLength: gdsForBumpScore[0].data.length,

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