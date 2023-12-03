<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import { useUser } from '@/composables/useUser'
import { db } from '@/lib/firebase'
import { Folder } from '@/interfaces/folder'

import Menu from './Menu.vue'
import FolderItem from './FolderItem.vue'

const { user } = useUser()
const folders = ref<Folder[]>([])

let unsubscribe: Unsubscribe | null = null

onMounted(() => {
  const q = query(
    collection(db, 'folders'),
    orderBy('createdAt', 'asc'),
    where('authorId', '==', user.value?.uid)
  )

  unsubscribe = onSnapshot(q, (querySnapshot) => {
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
})

onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <Menu>
    <FolderItem v-for="folder in folders" :data="folder" />
  </Menu>
</template>
