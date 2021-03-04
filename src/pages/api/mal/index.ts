import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { AnimeOnFirebase, FetchedData, Subtype } from '@/models/firebase/Anime'
import dayjs from 'dayjs'

interface Message {
  message: string
}

export default async (req: NextApiRequest, res: NextApiResponse<FetchedData | Message>) => {

  let secret = req.query.secret as string
  let mode = req.query.mode as Subtype

  let limit: number
  process.env.FIRESTORE_LIMIT ? limit = parseInt(process.env.FIRESTORE_LIMIT) : limit = 10

  if (secret != process.env.PAGES_MAL_API_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' })
  }

  if (!(mode == "byscore" || mode == "bypopularity")) {
    return res.status(401).json({ message: "Please specify byscore or bypopularity" })
  }

  let order: string
  if (mode == "bypopularity") {
    order = "rankOfPopularity"
  } if (mode == "byscore") {
    order = "rankOfScore"
  }

  function GetArrayOfData(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  ) {
    const animeArray = snapshot.docs.slice(0, limit).map((doc) => {
      const animeOnFirebase = doc.data() as AnimeOnFirebase
      return animeOnFirebase
    })
    return animeArray
  }

  function createBaseQuery() {
    return firestore()
      .collection("animeCollection")
      .orderBy(order)
      .limit(limit)
  }

  const snapshot = await createBaseQuery().get()

  const animesData = GetArrayOfData(snapshot)

  const animesArray = await Promise.all(animesData.map(async (anime: AnimeOnFirebase) => {
    return {
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
    }
  }))

  res.status(200).json({
    mode: mode,
    lastFetched: dayjs().toDate(),
    animes: animesArray,
  })
}
