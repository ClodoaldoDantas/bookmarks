<script setup lang="ts">
import { Folder as FolderIcon } from 'lucide-vue-next'

interface Props {
  data: {
    id: string
    name: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <router-link class="folder" :to="`/dashboard/${props.data.id}`">
    <FolderIcon :size="18" />

    <span>
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
