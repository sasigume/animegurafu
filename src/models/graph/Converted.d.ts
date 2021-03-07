import { Subtype } from "../firebase/FetchedData";

export type GraphType = "line" | "bump"
export interface Pos {
  x: string,
  y: number
}
export type graphData= {
  id: string
  data: Pos[]
  color: string
}

export interface DataForTwoGraph {
  gdsForBump: graphData[] | void
  gdsForLine: graphData[] | void
}

export type Converted = {
  ignoredDates: string[],
  sampleLength: number
  lastConverted: Date
  byScore: DataForTwoGraph
  byPopularity: DataForTwoGraph
} | Void
