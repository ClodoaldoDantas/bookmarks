<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore'
import { Folder as FolderIcon } from 'lucide-vue-next'
import { db } from '../lib/firebase'

interface Props {
  data: {
    id: string
    name: string
  }
}

const props = defineProps<Props>()

function handleKeyDown(event: Event) {
  const target = event.target as HTMLInputElement
  target.blur()
}

function handleBlur(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.innerText === props.data.name) {
    return
  }

  const folderRef = doc(db, 'folders', props.data.id)
  updateDoc(folderRef, { name: target.innerText })
}
</script>

<template>
  <router-link class="folder" :to="`/dashboard/${props.data.id}`">
    <FolderIcon :size="18" />

    <span
      contenteditable="true"
      @keydown.enter="handleKeyDown"
      @blur="handleBlur"
    >
      {{ props.data.name }}
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
@use '../styles/mixins';
.folder {
  @include mixins.action-button;
}
</style>
