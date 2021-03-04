import { Subtype } from "../firebase/Anime";
export interface Pos {
  x: string,
  y: number
}
export interface graphData {
  id: string,
  data: Pos[]
}

export type Converted = {
  mode: Subtype
  lastConverted: Date
  animes: graphData[]
  animesForBump: graphData[]
}
