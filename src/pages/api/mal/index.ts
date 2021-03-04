import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { AnimeOnFirebase } from '@/models/firebase/Anime'

export default async (req: NextApiRequest, res: NextApiResponse<AnimeOnFirebase[]>) => {

  function GetArrayOfData(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  ) {
    const animeArray = snapshot.docs.map((doc) => {
      const animeOnFirebase = doc.data() as AnimeOnFirebase
      return animeOnFirebase
    })
    return animeArray
  }

  function createBaseQuery() {
    return firestore()
      .collection("animeCollection")
  }

  const snapshot = await createBaseQuery().get()

  const animes = GetArrayOfData(snapshot)

  const result = await Promise.all(animes.map(async (anime: AnimeOnFirebase) => {
    return {
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
      scoreArray: anime.scoreArray
    }
  }))

  res.status(200).json(result)
}
