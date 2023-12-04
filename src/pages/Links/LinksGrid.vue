<script lang="ts" setup>
import { Link } from '@/interfaces/link'

interface Props {
  items: Link[]
}

const props = defineProps<Props>()
</script>

<template>
  <ul class="list">
    <li v-for="link in props.items" :key="link.id">
      <a
        :href="link.url"
        target="_blank"
        class="link"
        rel="noopener noreferrer"
      >
        {{ link.title }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link {
  display: inline-block;
  color: var(--text-primary);
  border-bottom: 1px dashed var(--text-secondary);
}
</style>
