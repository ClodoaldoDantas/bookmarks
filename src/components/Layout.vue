<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100%;

  display: grid;
  grid-template-columns: 240px 1fr;
}
</style>
