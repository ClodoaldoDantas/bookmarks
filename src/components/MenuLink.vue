<script setup lang="ts">
import { Bookmark } from 'lucide-vue-next'

interface Props {
  text: string
}

const props = defineProps<Props>()
</script>

<template>
  <a class="menu-link" href="#">
    <Bookmark :size="18" />
    <span>{{ props.text }}</span>
  </a>
</template>

<style lang="scss" scoped>
.menu-link {
  background: transparent;
  border: none;
  border-radius: 5px;
  width: 95%;

  padding: 0.5rem 0.75rem;
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: color 200ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
  }
}
</style>
