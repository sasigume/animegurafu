
import { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({})
}

/*
import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import {AnimeData } from '@/models/firebase/AnimeData'

export default async (req: NextApiRequest, res: NextApiResponse<AnimeData[]>) => {

  const slug = req.query.slug as string

  function GetArrayOfData(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) {
    const array = snapshot.docs.map((doc) => {
      const data = doc.data() as AnimeData
      return data
    })
    return array
  }

  function createBaseQuery() {
    return firestore()
      .collection('animebyscore')
      .limit(10)
  }

  const snapshot = await createBaseQuery().get()

  const data = GetArrayOfData(snapshot)

  res.status(200).json(data)
}
 */