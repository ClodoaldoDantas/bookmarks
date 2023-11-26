<template>
  <input class="text-field" type="text" />
</template>

<style lang="scss" scoped>
.text-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: 0;

  background: rgba(255, 255, 255, 0.055);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }
}
</style>
