import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { AnimeForGraph} from '@/models/index'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
dayjs.locale('ja')
interface Message {
  message: string
}

export default async (req: NextApiRequest, res: NextApiResponse<AnimeForGraph | Message>) => {

  let secret = req.query.secret as string
  let mal_id = req.query.mal_id as string

  if (secret != process.env.PAGES_MAL_API_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' })
  }


  const getAnimeData = async () => {

    function GetData(
      snapshot: firestore.DocumentSnapshot<firestore.DocumentData>
    ) {
      return snapshot.data() as AnimeForGraph
    }

    function createBaseQuery() {
      return firestore()
        .collection("animeCollection")
        .doc(mal_id)
    }

    const snapshot = await createBaseQuery().get()

    const animeData = GetData(snapshot)

    const convert = (anime: AnimeForGraph) => {
      return {
        color: anime.color,
        cacheTtlOfRanking: anime.cacheTtlOfRanking,
        lastUpdateEnv: anime.lastUpdateEnv,
        lastUpdateTime: anime.lastUpdateTime,
        //updateTimeArray: anime.updateTimeArray,
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
    }

    return convert(animeData)
  }

  const result = await getAnimeData()

  res.status(200).json(result)
}