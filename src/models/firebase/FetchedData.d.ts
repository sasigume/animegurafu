export type Subtype = "byscore" | "bypopularity"
export interface NumberOfDate {
  [key:string]: number
}
export interface tsOfDate {
  [key: string]: firebase.firestore.Timestamp
}
export interface AnimeOnFirebase {
  cacheTtlOfRanking: number
  lastUpdateEnv: string
  lastUpdateTime: string
  updateTimeArray: tsOfDate[]
  start_date: string
  end_date: string
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
  scoreArray: numberOfDate[]
  membersArray: numberOfDate[]
  rankOfScoreArray: numberOfDate[]
  rankOfPopularityArray: numberOfDate[]
  color: string
}

export interface FetchedData {
  lastFetched: Date | string
  animesByPopularity: AnimeOnFirebase[] | Void
  animesByScore: AnimeOnFirebase[] | Void
}