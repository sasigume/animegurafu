import { FetchedData } from '@/models/index'
import { ConvertedForMultiGraph } from "@/models/index"
import dayjs from "dayjs"

import {GraphDatasForBump,GraphDatasForLine} from './graph-data-parser'

const BROKEN_DATA = process.env.BROKEN_DATA?.split(',') ?? []

type Converter = (fetchedData: FetchedData) => ConvertedForMultiGraph

const ConvertForMultiGraph: Converter = (fetchedData) => {

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
  return result(finalSlice) as ConvertedForMultiGraph
}

export default ConvertForMultiGraph