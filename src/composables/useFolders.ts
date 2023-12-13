import { Folder } from '@/interfaces/folder'
import { db } from '@/lib/firebase'

import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore'

import { ref, watchEffect } from 'vue'
import { useUser } from './useUser'

export function useFolders() {
  const { user } = useUser()
  const folders = ref<Folder[]>([])

  const q = query(
    collection(db, 'folders'),
    orderBy('createdAt', 'asc'),
    where('authorId', '==', user.value?.uid)
  )

  const unsub = onSnapshot(q, (querySnapshot) => {
    const data: Folder[] = []

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
        createdAt: doc.data().createdAt.toDate(),
      })
    })

    folders.value = data
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return {
    folders,
  }
}
