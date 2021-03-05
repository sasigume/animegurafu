import { Subtype } from "../firebase/Anime";

export type GraphType = "line" | "bump"
export interface Pos {
  x: string,
  y: number | undefined
}
export interface graphData {
  id: string,
  data: Pos[]
}

export interface DataForTwoGraph {
  gdsForBump: graphData[] | void
  gdsForLine: graphData[] | void
}

export type Converted = {
  sampleLength: number
  lastConverted: Date
  byScore: DataForTwoGraph
  byPopularity: DataForTwoGraph
} | Void
