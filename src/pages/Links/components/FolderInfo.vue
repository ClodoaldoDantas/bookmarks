<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Edit } from 'lucide-vue-next'
import { toast } from 'vue3-toastify'

import { Folder } from '@/interfaces/folder'
import { folderService } from '@/services/folder'

import FolderInput from './FolderInput.vue'

const emit = defineEmits<{
  (event: 'updateFolder', payload: string): void
}>()

const dateTimeOptions: any = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  folder: Folder
}

const props = defineProps<Props>()

const folderName = ref(props.folder.name)
const isEditing = ref(false)

const dateFormatted = computed(() => {
  return props.folder.createdAt.toLocaleDateString('pt-BR', dateTimeOptions)
})

function handleEditFolder() {
  isEditing.value = true
}

function updateFolderName(name: string) {
  if (!name) {
    folderName.value = props.folder.name
    isEditing.value = false
    return
  }

  if (name === props.folder.name) {
    isEditing.value = false
    return
  }

  folderService
    .update(props.folder.id, name)
    .then(() => {
      folderName.value = name
      emit('updateFolder', name)
    })
    .catch(() => {
      folderName.value = props.folder.name
      toast.error('Não foi possível atualizar o nome da pasta')
    })
    .finally(() => {
      isEditing.value = false
    })
}
</script>

<template>
  <div class="folder-info">
    <div class="folder-info__content">
      <FolderInput
        v-if="isEditing"
        v-model="folderName"
        @edit="updateFolderName"
      />

      <h1 v-else>{{ folderName }}</h1>

      <button v-show="!isEditing" type="button" @click="handleEditFolder()">
        <Edit :size="20" />
      </button>
    </div>

    <span>Criado em {{ dateFormatted }}</span>
  </div>
</template>

<style lang="scss" scoped>
.folder-info {
  max-width: 400px;
  margin-bottom: 1rem;

  &__content {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    input {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      background-color: transparent;
      border: 0;
    }

    &:hover button {
      opacity: 1;
      visibility: visible;
    }

    button {
      background-color: transparent;
      color: var(--text-secondary);
      border: 0;

      opacity: 0;
      visibility: hidden;

      transition: all 0.2s;

      &:hover {
        color: var(--text-primary);
      }
    }
  }

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
