<script setup lang="ts">
import { UserCircle } from 'lucide-vue-next'
import { useUser } from '@/composables/useUser'

const { user } = useUser()
</script>

<template>
  <div v-if="user" class="profile">
    <img class="profile-photo" v-if="user.photoURL" :src="user.photoURL" />
    <UserCircle v-else :size="24" />

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

.profile-photo {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
