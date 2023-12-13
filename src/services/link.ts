import { Link } from '@/interfaces/link'
import { db } from '@/lib/firebase'

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

interface LinkFormData {
  title: string
  url: string
  folderId: string
}

export const linkService = {
  create: async (data: LinkFormData) => {
    const docRef = await addDoc(collection(db, 'links'), {
      title: data.title,
      url: data.url,
      folderId: data.folderId,
      createdAt: Timestamp.fromDate(new Date()),
    })

    return docRef
  },

  findAll: async (folderId: string) => {
    const q = query(
      collection(db, 'links'),
      orderBy('createdAt', 'asc'),
      where('folderId', '==', folderId)
    )

    const querySnapshot = await getDocs(q)
    const data: Link[] = []

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
        folderId: doc.data().folderId,
      })
    })

    return data
  },

  delete: async (id: string) => {
    await deleteDoc(doc(db, 'links', id))
  },
}
