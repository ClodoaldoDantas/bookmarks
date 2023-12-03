<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { Folder } from '@/interfaces/folder'
import { db } from '@/lib/firebase'

const route = useRoute()
const folderData = ref<Folder | null>(null)

const dateTimeOptions: any = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

function handleKeyDown(event: Event) {
  const target = event.target as HTMLInputElement
  target.blur()
}

function handleBlur(event: Event) {
  const target = event.target as HTMLInputElement

  if (!target.innerText) {
    target.innerText = folderData?.value?.name as string
    return
  }

  if (target.innerText === folderData?.value?.name) {
    return
  }

  const folderRef = doc(db, 'folders', folderData?.value?.id as string)

  updateDoc(folderRef, { name: target.innerText })
}

async function fetchFolderData(folderId: string) {
  const folderRef = doc(db, 'folders', folderId)
  const folder = await getDoc(folderRef)

  if (!folder.exists()) {
    return
  }

  folderData.value = {
    id: folder.id,
    name: folder.data().name,
    createdAt: folder.data().createdAt.toDate(),
  }
}

watch(
  () => route.params.folderId,
  async (newId) => {
    fetchFolderData(newId as string)
  }
)

onMounted(() => {
  const folderId = route.params.folderId as string
  fetchFolderData(folderId)
})
</script>

<template>
  <header v-if="folderData" class="header">
    <h1
      contenteditable="true"
      @keydown.enter="handleKeyDown"
      @blur="handleBlur"
    >
      {{ folderData.name }}
    </h1>

    <span>
      Criado em
      {{ folderData.createdAt.toLocaleDateString('pt-BR', dateTimeOptions) }}
    </span>
  </header>
</template>

<style lang="scss" scoped>
.header {
  max-width: 400px;

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  span {
    font-size: 1rem;
    color: var(--text-secondary);
  }
}
</style>
