<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
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
</script>

<template>
  <Menu>
    <FolderItem v-for="folder in folders" :data="folder" />
  </Menu>
</template>
