<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Menu from './Menu.vue'
import FolderItem from './FolderItem.vue'

import { useUser } from '../composables/useUser'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface Folder {
  id: string
  name: string
}

const { user } = useUser()
const folders = ref<Folder[]>([])

onMounted(() => {
  const q = query(
    collection(db, 'folders'),
    where('authorId', '==', user.value?.uid)
  )

  onSnapshot(q, (querySnapshot) => {
    const data: Folder[] = []

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        name: doc.data().name,
      })
    })

    folders.value = data
  })
})
</script>

<template>
  <Menu>
    <FolderItem v-for="folder in folders" :data="folder" />
  </Menu>
</template>
