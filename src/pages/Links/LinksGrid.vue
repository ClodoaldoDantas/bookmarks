<script lang="ts" setup>
import { ref } from 'vue'
// import { useRoute } from 'vue-router'

interface Link {
  id: string
  title: string
  url: string
}

// const route = useRoute()
const links = ref<Link[]>([])

// TODO: fetch links by folderId
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <a :href="link.url" target="_blank" rel="noopener noreferrer">
        {{ link.title }}
      </a>
    </li>
  </ul>
</template>
