<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/composables/useUser'
import { User, updateProfile } from 'firebase/auth'

import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const { user } = useUser()

const isLoading = ref(false)
const message = ref<string | null>(null)

const name = ref(user.value?.displayName ?? '')
const photoURL = ref(user.value?.photoURL ?? '')

async function handleSubmit() {
  isLoading.value = true
  message.value = null

  try {
    await updateProfile(user.value as User, {
      displayName: name.value,
      photoURL: photoURL.value,
    })

    message.value = 'Perfil atualizado com sucesso!'
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
      <span class="message" v-if="message">{{ message }}</span>

      <div class="account-form-group">
        <label for="display-name">Nome do Usuário</label>
        <Field type="text" id="display-name" v-model="name" required />
      </div>

      <div class="account-form-group">
        <label for="profile-photo">Foto do Perfil</label>
        <Field
          type="url"
          id="profile-photo"
          placeholder="URL da imagem"
          v-model="photoURL"
        />
      </div>

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

.account-form-group {
  width: 100%;

  label {
    font-size: 1rem;
    display: block;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
  }
}

.message {
  color: var(--text-success);
}
</style>
