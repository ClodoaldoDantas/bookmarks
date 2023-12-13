<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void
  (event: 'edit', payload: string): void
}>()

const input = ref<HTMLInputElement | null>(null)

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function handleBlur(event: Event) {
  const target = event.target as HTMLInputElement
  emit('edit', target.value)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const target = event.target as HTMLInputElement
    emit('edit', target.value)
  }
}

onMounted(() => {
  input.value?.focus()
})
</script>

<template>
  <input
    type="text"
    ref="input"
    :value="modelValue"
    @input="handleInput"
    @blur="handleBlur"
    @keydown="handleKeyDown"
  />
</template>
