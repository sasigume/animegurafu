import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { AnimeData } from '@/models/firebase/AnimeData'

const mode = "animeByscore"

export default async (req: NextApiRequest, res: NextApiResponse<AnimeData[]>) => {

  function GetArrayOfData(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  ) {
    const array = snapshot.docs.map((doc) => {
      return {
        date: doc.data().date,
      }
    })
    return array
  }

  function createBaseQuery() {
    return firestore()
      .collection(mode)
  }



  const snapshot = await createBaseQuery().get()

  const datas = GetArrayOfData(snapshot)

  const animeData = await Promise.all(datas.map(async (data: any) => {
    let subCollections = await firestore()
      .collection(mode)
      .doc(data.date)
      .listCollections()
      .then(async (collection) => {
        let subCollections = await Promise.all(collection.map(async (sc) => {
          let oneCollection = await sc
            .get()
            .then((animeCollection => {
              let animeDocs = Promise.all(animeCollection.docs.map(async (d) => {
                let animeData = await d.data()
                return animeData
              }))
              return animeDocs
            })
            )
          oneCollection.sort((a, b) => a.rank - b.rank)
          return oneCollection
        }))
        return {
          animes: subCollections[0],
          schedule: subCollections[1]
        }
      })

    return {
      date: data.date,
      animes: subCollections.animes,
      schedule: subCollections.animes
    }
    // https://stackoverflow.com/questions/55620618/how-to-get-sub-collections-with-firebase-firestore
  }))

  res.status(200).json(animeData)
}
