<script setup lang="ts">
import { reactive, ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRoute } from 'vue-router'

import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const route = useRoute()

const isLoading = ref(false)

const state = reactive({
  title: '',
  url: '',
})

async function handleSubmit() {
  isLoading.value = true

  try {
    await addDoc(collection(db, 'links'), {
      title: state.title,
      url: state.url,
      folderId: route.params.folderId,
    })

    state.title = ''
    state.url = ''
  } catch (err) {
    console.error(err)
    alert('Não foi possível adicionar o link.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit()" class="form">
    <Field type="text" placeholder="Título" v-model="state.title" required />
    <Field
      type="url"
      placeholder="URL da página"
      v-model="state.url"
      required
    />

    <Button type="submit" :disabled="isLoading">Adicionar</Button>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    min-width: 150px;
  }
}
</style>
