<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRoute } from 'vue-router'

import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const emit = defineEmits(['add'])

const route = useRoute()
const isLoading = ref(false)

const state = reactive({
  title: '',
  url: '',
})

function resetForm() {
  state.title = ''
  state.url = ''
}

async function handleSubmit() {
  isLoading.value = true

  try {
    const formData = {
      title: state.title,
      url: state.url,
      folderId: route.params.folderId,
    }

    const docRef = await addDoc(collection(db, 'links'), {
      ...formData,
      createdAt: Timestamp.fromDate(new Date()),
    })

    resetForm()

    emit('add', { id: docRef.id, ...formData })
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
  flex-wrap: wrap;
  gap: 1rem;

  input {
    flex: 1 1 230px;
  }

  button {
    flex: 0 0 150px;
  }
}
</style>
