<script setup lang="ts">
import { Plus, LogOut, Settings } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import { useUser } from '@/composables/useUser'
import { folderService } from '@/services/folder'
import { authService } from '@/services/auth'

import Profile from './Profile.vue'
import Menu from './Menu.vue'
import MenuButton from './MenuButton.vue'
import FolderList from './FolderList.vue'

const router = useRouter()
const { user } = useUser()

async function handleSignOut() {
  await authService.logout()
  router.replace('/')
}

async function handleCreateFolder() {
  const folderName = prompt('Digite o nome da pasta:')

  if (!folderName) {
    return
  }

  try {
    await folderService.create({
      name: folderName,
      authorId: user.value!.uid,
    })
  } catch (err) {
    console.error(err)
    toast.error('Não foi possível criar a pasta.')
  }
}

function handleNavigateToAccount() {
  router.push('/dashboard/account')
}
</script>

<template>
  <aside class="sidebar">
    <Profile />

    <Menu>
      <MenuButton @click="handleNavigateToAccount()">
        <Settings :size="18" />
        Minha Conta
      </MenuButton>

      <MenuButton @click="handleSignOut()">
        <LogOut :size="18" />
        Sair da Conta
      </MenuButton>
    </Menu>

    <div class="add-folder">
      <span>Pastas</span>

      <button
        type="button"
        @click="handleCreateFolder()"
        aria-label="Nova Pasta"
      >
        <Plus :size="18" />
      </button>
    </div>

    <FolderList />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--card);
  box-shadow: rgba(255, 255, 255, 0.05) -1px 0px 0px 0px inset;
}

.add-folder {
  margin: 2rem 0.75rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  button {
    border: 0;
    background-color: transparent;
    color: var(--text-secondary);

    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>
