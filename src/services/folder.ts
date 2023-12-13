import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { Folder } from '@/interfaces/folder'

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

  findById: async (id: string): Promise<Folder | null> => {
    const folderRef = doc(db, 'folders', id)
    const data = await getDoc(folderRef)

    if (!data.exists()) {
      return null
    }

    return {
      id: data.id,
      name: data.data().name,
      createdAt: data.data().createdAt.toDate(),
    }
  },
}
