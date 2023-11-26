<script setup lang="ts">
import { Bookmark } from 'lucide-vue-next'

interface Props {
  text: string
}

const props = defineProps<Props>()
</script>

<template>
  <a class="menu-link" href="#">
    <Bookmark :size="18" />
    <span>{{ props.text }}</span>
  </a>
</template>

<style lang="scss" scoped>
@use '../styles/mixins';
.menu-link {
  @include mixins.action-button;
}
</style>
