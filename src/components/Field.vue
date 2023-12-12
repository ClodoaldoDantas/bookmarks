<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="text-field"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
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

  &:disabled {
    opacity: 0.7;
    color: var(--text-secondary);
    cursor: not-allowed;
  }
}
</style>
