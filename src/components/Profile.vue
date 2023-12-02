<script setup lang="ts">
import { UserCircle } from 'lucide-vue-next'
import { useUser } from '../composables/useUser'

const { user } = useUser()
</script>

<template>
  <div v-if="user" class="profile">
    <UserCircle :size="24" />
    <span>{{ user.displayName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;

  span {
    font-size: 0.875rem;
  }
}
</style>
