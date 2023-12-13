<script lang="ts" setup>
import { Trash2 } from 'lucide-vue-next'
import { Link } from '@/interfaces/link'
import { linkService } from '@/services/link'

interface Props {
  items: Link[]
}

const props = defineProps<Props>()
const emit = defineEmits(['remove'])

async function handleDeleteLink(id: string) {
  try {
    await linkService.delete(id)
    emit('remove', { id })
  } catch {
    alert('Não foi possível deletar o link')
  }
}
</script>

<template>
  <ul class="list">
    <li class="list-item" v-for="link in props.items" :key="link.id">
      <img
        :src="`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`"
        alt=""
      />

      <div>
        <span>{{ link.title }}</span>

        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.url }}
        </a>
      </div>

      <button
        @click="handleDeleteLink(link.id)"
        class="delete-button"
        type="button"
      >
        <Trash2 :size="20" />
      </button>
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
  position: relative;

  padding: 1.5rem;
  background-color: var(--card);
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  a {
    font-size: 0.875rem;
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  }
}

.delete-button {
  position: absolute;
  top: 1rem;
  right: 1rem;

  background-color: transparent;
  border: none;
  color: var(--text-secondary);

  cursor: pointer;
  transition: all 150ms;

  &:hover {
    color: var(--text-primary);
  }
}
</style>
