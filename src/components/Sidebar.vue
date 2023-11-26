<script setup lang="ts">
import { PlusCircle, LogOut } from 'lucide-vue-next'
</script>

<template>
  <aside class="sidebar">
    <div class="profile">
      <img src="https://github.com/clodoaldodantas.png" alt="" />
      <span>Clodoaldo Dantas</span>
    </div>

    <nav class="navigation-actions">
      <button type="button">
        <PlusCircle :size="18" />
        <span>Nova Página</span>
      </button>

      <button type="button">
        <LogOut :size="18" />
        <span>Sair da Conta</span>
      </button>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 1rem;
  background-color: var(--sidebar);
  box-shadow: rgba(255, 255, 255, 0.05) -1px 0px 0px 0px inset;
}

.profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 2rem;
    width: 2rem;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    font-size: 0.875rem;
  }
}

.navigation-actions {
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  button {
    background: none;
    border: none;
    width: 100%;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 200ms;

    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>
