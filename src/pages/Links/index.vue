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

import Loader from '@/components/Loader.vue'
import FolderInfo from './FolderInfo.vue'
import AddLinkForm from './AddLinkForm.vue'
import LinksGrid from './LinksGrid.vue'

const route = useRoute()

const isLoading = ref(false)
const error = ref<string | null>(null)

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
  } catch {
    throw new Error('Não foi possível buscar as informações pasta')
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
  } catch {
    throw new Error('Não foi possível buscar os links')
  }
}

async function fetchData(id: string) {
  isLoading.value = true

  try {
    await Promise.all([fetchFolderData(id), fetchLinks(id)])
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.params.folderId,
  async (newId) => {
    const folderId = newId as string
    await fetchData(folderId)
  }
)

onMounted(async () => {
  const folderId = route.params.folderId as string
  await fetchData(folderId)
})
</script>

<template>
  <div v-if="isLoading" class="center">
    <Loader />
  </div>

  <div v-else-if="error" class="container">
    <span class="error" role="alert">{{ error }}</span>
  </div>

  <div v-else class="container">
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

.center {
  height: 100%;
  width: calc(100% - 240px);

  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  color: var(--text-danger);
}
</style>
