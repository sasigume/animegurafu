import { AnimeForGraph, AnimeForSingle, graphData } from '@/models/index'
import { GraphDatasForLine } from './graph-data-parser'

type Converter = (anime: AnimeForGraph) => any

const ConvertForSingle: Converter = (anime: AnimeForGraph) => {

  const gds = GraphDatasForLine({
    animes: [anime],
    mode: "bypopularity"
  })
  console.log(gds)

  return {
    color: anime.color,
    cacheTtlOfRanking: anime.cacheTtlOfRanking,
    lastUpdateEnv: anime.lastUpdateEnv,
    lastUpdateTime: anime.lastUpdateTime,
    updateTimeArray: anime.updateTimeArray,
    mal_id: anime.mal_id,
    title: anime.title,
    title_japanese: anime.title_japanese,
    url: anime.url,
    image_url: anime.image_url,
    type: anime.type,
    start_date: anime.start_date,
    end_date: anime.end_date,
    score: anime.score,
    scored_by: anime.scored_by,
    rankOfScore: anime.rankOfScore,
    rankOfPopularity: anime.rankOfPopularity,
    members: anime.members,
    favorites: anime.favorites,
    membersArray: anime.membersArray,
    scoreArray: anime.scoreArray,
    rankOfScoreArray: anime.rankOfScoreArray,
    rankOfPopularityArray: anime.rankOfPopularityArray,
    gds: gds
  }
}

export default ConvertForSingle