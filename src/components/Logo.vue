<script setup lang="ts">
import { BookmarkCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="logo">
    <BookmarkCheck :size="30" />
    <span>Bookmarks</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>
