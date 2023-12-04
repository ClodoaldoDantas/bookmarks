<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Link } from '@/interfaces/link'
import { Folder } from '@/interfaces/folder'

import { db } from '@/lib/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

import FolderInfo from './FolderInfo.vue'
import AddLinkForm from './AddLinkForm.vue'
import LinksGrid from './LinksGrid.vue'

const route = useRoute()
const links = ref<Link[]>([])
const folder = ref<Folder | null>(null)

function addLink(link: Link) {
  links.value.push(link)
}

async function fetchFolderData(folderId: string) {
  try {
    const folderRef = doc(db, 'folders', folderId)
    const data = await getDoc(folderRef)

    if (!data.exists()) {
      return
    }

    folder.value = {
      id: data.id,
      name: data.data().name,
      createdAt: data.data().createdAt.toDate(),
    }
  } catch (err) {
    console.error(err)
  }
}

async function fetchLinks(folderId: string) {
  try {
    const q = query(
      collection(db, 'links'),
      orderBy('createdAt', 'asc'),
      where('folderId', '==', folderId)
    )

    const querySnapshot = await getDocs(q)
    const linksData: Link[] = []

    querySnapshot.forEach((doc) => {
      linksData.push({
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
        folderId: doc.data().folderId,
      })
    })

    links.value = linksData
  } catch (err) {
    console.error(err)
  }
}

watch(
  () => route.params.folderId,
  async (newId) => {
    const folderId = newId as string
    Promise.all([fetchFolderData(folderId), fetchLinks(folderId)])
  }
)

onMounted(() => {
  const folderId = route.params.folderId as string
  Promise.all([fetchFolderData(folderId), fetchLinks(folderId)])
})
</script>

<template>
  <div class="container">
    <header v-if="folder" class="header">
      <FolderInfo :folder="folder" />
      <AddLinkForm @add="addLink" />
    </header>

    <section>
      <LinksGrid :items="links" />
    </section>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
