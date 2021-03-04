export type Subtype = "byscore" | "bypopularity"
export interface NumberOfDate {
  [key:string]: string
}
export interface AnimeOnFirebase {
  start_date: string
  end_date?: string
  mal_id: string
  title: string
  title_japanese: string
  url: string
  image_url: string
  type: string
  score: number
  scored_by: number
  members: number
  favorites: number
  rankOfPopularity: number
  rankOfScore: number
  membersArray: numberOfDate[]
  scoreArray: numberOfDate[]
}

export interface FetchedData {
  mode: string
  date: string
  animes: AnimeOnFirebase[]
}