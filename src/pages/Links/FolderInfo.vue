<script lang="ts" setup>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Folder } from '@/interfaces/folder'
import { computed } from 'vue'

const dateTimeOptions: any = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  folder: Folder
}

const props = defineProps<Props>()

const dateFormatted = computed(() => {
  return props.folder.createdAt.toLocaleDateString('pt-BR', dateTimeOptions)
})

function handleKeyDown(event: Event) {
  const target = event.target as HTMLInputElement
  target.blur()
}

function handleBlur(event: Event) {
  const target = event.target as HTMLInputElement

  if (!target.innerText) {
    target.innerText = props.folder.name
    return
  }

  if (target.innerText === props.folder.name) {
    return
  }

  const folderRef = doc(db, 'folders', props.folder.id)

  updateDoc(folderRef, { name: target.innerText })
}
</script>

<template>
  <div class="folder-info">
    <h1
      contenteditable="true"
      @keydown.enter="handleKeyDown"
      @blur="handleBlur"
    >
      {{ props.folder.name }}
    </h1>

    <span> Criado em {{ dateFormatted }}</span>
  </div>
</template>

<style lang="scss" scoped>
.folder-info {
  max-width: 400px;
  margin-bottom: 1rem;

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
