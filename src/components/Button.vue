<template>
  <button class="btn" type="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: var(--action);
  color: var(--text-primary);

  font-size: 1rem;
  font-weight: 500;

  transition: all 200ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background-color: var(--action-hover);
  }
}
</style>
