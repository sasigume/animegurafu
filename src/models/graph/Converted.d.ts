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
  gdsForLine: graphData[] | void
  gdsForBump: graphData[] | void
}

export type Converted = {
  lastConverted: Date
  byScore: DataForTwoGraph
  byPopularity: DataForTwoGraph
} | Void
