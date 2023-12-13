<script setup lang="ts">
import { useFolders } from '@/composables/useFolders'

import Menu from './Menu.vue'
import FolderItem from './FolderItem.vue'

const { folders } = useFolders()
</script>

<template>
  <Menu>
    <FolderItem v-for="folder in folders" :data="folder" />
  </Menu>
</template>
