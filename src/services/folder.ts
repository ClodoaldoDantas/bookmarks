import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

interface FolderData {
  name: string
  authorId: string
}

export const folderService = {
  create: async (data: FolderData) => {
    await addDoc(collection(db, 'folders'), {
      name: data.name,
      authorId: data.authorId,
      createdAt: Timestamp.fromDate(new Date()),
    })
  },

  update: async (id: string, name: string) => {
    const folderRef = doc(db, 'folders', id)
    return updateDoc(folderRef, { name })
  },
}
