<script setup lang="ts">
import { PlusCircle, LogOut } from 'lucide-vue-next'

import Profile from './Profile.vue'
import Menu from './Menu.vue'
import MenuButton from './MenuButton.vue'
import MenuLink from './MenuLink.vue'
</script>

<template>
  <aside class="sidebar">
    <Profile />

    <Menu>
      <MenuButton>
        <PlusCircle :size="18" />
        Nova Página
      </MenuButton>

      <MenuButton>
        <LogOut :size="18" />
        Sair da Conta
      </MenuButton>
    </Menu>

    <Menu>
      <MenuLink text="CSS" />
      <MenuLink text="Javascript" />
      <MenuLink text="Node" />
      <MenuLink text="React JS" />
      <MenuLink text="Next JS" />
      <MenuLink text="Vue JS" />
      <MenuLink text="Nuxt JS" />
    </Menu>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: var(--sidebar);
  box-shadow: rgba(255, 255, 255, 0.05) -1px 0px 0px 0px inset;

  nav + nav {
    margin-top: 2rem;
  }
}
</style>
