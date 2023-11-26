<template>
  <button class="menu-button" type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '../styles/mixins';
.menu-button {
  @include mixins.action-button;
}
</style>
