<script setup lang="ts">
import { FolderPlus, LogOut } from 'lucide-vue-next'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'vue-router'

import Profile from './Profile.vue'
import Menu from './Menu.vue'
import MenuButton from './MenuButton.vue'
// import MenuLink from './MenuLink.vue'

const router = useRouter()

async function handleSignOut() {
  await signOut(auth)
  router.replace('/')
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

      <MenuButton>
        <FolderPlus :size="18" />
        Nova Pasta
      </MenuButton>
    </Menu>

    <!-- <Menu>
      <MenuLink text="CSS" />
      <MenuLink text="Javascript" />
      <MenuLink text="Node" />
      <MenuLink text="React JS" />
      <MenuLink text="Next JS" />
      <MenuLink text="Vue JS" />
      <MenuLink text="Nuxt JS" />
    </Menu> -->
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
