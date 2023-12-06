<script lang="ts" setup>
import { Link } from '@/interfaces/link'
import { Link2 } from 'lucide-vue-next'

interface Props {
  items: Link[]
}

const props = defineProps<Props>()
</script>

<template>
  <ul class="list">
    <li class="list-item" v-for="link in props.items" :key="link.id">
      <span>
        {{ link.title }}
      </span>

      <a :href="link.url" target="_blank" rel="noopener noreferrer">
        <Link2 :size="18" />
        {{ link.url }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.list-item {
  padding: 2rem;
  background-color: var(--card);
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  a {
    font-size: 0.875rem;
    color: var(--text-secondary);

    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>
