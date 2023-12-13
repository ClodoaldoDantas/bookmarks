<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { Link } from '@/interfaces/link'
import { Folder } from '@/interfaces/folder'
import { folderService } from '@/services/folder'
import { linkService } from '@/services/link'

import Loader from '@/components/Loader.vue'
import FolderInfo from './components/FolderInfo.vue'
import AddLinkForm from './components/AddLinkForm.vue'
import LinksGrid from './components/LinksGrid.vue'

const route = useRoute()

const isLoading = ref(false)
const error = ref<string | null>(null)

const links = ref<Link[]>([])
const folder = ref<Folder | null>(null)

function addLink(link: Link) {
  links.value.push(link)
}

function removeLink({ id }: { id: string }) {
  links.value = links.value.filter((link) => link.id !== id)
}

function updateFolder(name: string) {
  if (!folder.value) {
    return
  }

  folder.value.name = name
}

async function fetchFolderData(folderId: string) {
  try {
    const data = await folderService.findById(folderId)
    folder.value = data
  } catch {
    throw new Error('Não foi possível buscar as informações pasta')
  }
}

async function fetchLinks(folderId: string) {
  try {
    const data = await linkService.findAll(folderId)
    links.value = data
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
      <FolderInfo :folder="folder" @update-folder="updateFolder" />
      <AddLinkForm @add="addLink" />
    </header>

    <section>
      <LinksGrid :items="links" @remove="removeLink" />
    </section>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
}

.center {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  color: var(--text-danger);
}
</style>
