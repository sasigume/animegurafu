import { NumberOfDate, tsOfDate } from "../firebase/FetchedData";

export interface AnimeForList {
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
  scoreArray: NumberOfDate[]
  membersArray: numberOfDate[]
  rankOfScoreArray: numberOfDate[]
  rankOfPopularityArray: numberOfDate[]
  color: string
}