<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/composables/useUser'

import { updateProfile } from 'firebase/auth'

import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const { user } = useUser()

const isLoading = ref(false)
const name = ref(user.value?.displayName ?? '')
const photoURL = ref(user.value?.photoURL ?? '')

async function handleSubmit() {
  isLoading.value = true

  try {
    await updateProfile(user.value, {
      displayName: name.value,
      photoURL: photoURL.value,
    })

    // TODO: adicionar um toast de sucesso
    console.log('Perfil atualizado com sucesso!')
  } catch (err) {
    alert('Não foi possível atualizar as informações da conta.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <header class="account-header">
      <h1>Minha Conta</h1>
      <p>Gerencie as informações de conta</p>
    </header>

    <form @submit.prevent="handleSubmit()" class="account-form">
      <Field
        type="text"
        placeholder="Nome do Usuário"
        v-model="name"
        required
      />

      <Field type="url" placeholder="URL da foto" v-model="photoURL" />

      <Button type="submit" :disabled="isLoading">Atualizar informações</Button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.account-header {
  margin-bottom: 1rem;

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: var(--text-secondary);
  }
}

.account-form {
  max-width: 800px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
