<script setup lang="ts">
import { FolderPlus, LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import { signOut } from 'firebase/auth'
import { Timestamp, addDoc, collection } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase'
import { useUser } from '@/composables/useUser'

import Profile from './Profile.vue'
import Menu from './Menu.vue'
import MenuButton from './MenuButton.vue'
import FolderList from './FolderList.vue'

const router = useRouter()
const { user } = useUser()

async function handleSignOut() {
  await signOut(auth)
  router.replace('/')
}

async function handleCreateFolder() {
  const folderName = prompt('Digite o nome da pasta:')

  if (!folderName) {
    return
  }

  try {
    await addDoc(collection(db, 'folders'), {
      name: folderName,
      authorId: user.value?.uid,
      createdAt: Timestamp.fromDate(new Date()),
    })
  } catch (err) {
    console.error(err)
    alert('Não foi possível criar a pasta.')
  }
}
</script>

<template>
  <aside class="sidebar">
    <Profile />

    <Menu>
      <MenuButton @click="handleSignOut()">
        <LogOut :size="18" />
        Sair da Conta
      </MenuButton>

      <MenuButton @click="handleCreateFolder()">
        <FolderPlus :size="18" />
        Nova Pasta
      </MenuButton>
    </Menu>

    <FolderList />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--card);
  box-shadow: rgba(255, 255, 255, 0.05) -1px 0px 0px 0px inset;

  nav + nav {
    margin-top: 2rem;
  }
}
</style>
