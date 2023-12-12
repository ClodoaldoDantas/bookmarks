<script setup lang="ts">
import { ref } from 'vue'
import { Save, Image } from 'lucide-vue-next'
import { User, updateProfile } from 'firebase/auth'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'

import { useUser } from '@/composables/useUser'
import { storage } from '@/lib/firebase'

import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const { user } = useUser()

const isLoading = ref(false)
const uploadIsLoading = ref(false)

const message = ref<string | null>(null)

const name = ref(user.value?.displayName ?? '')
const photoURL = ref(user.value?.photoURL ?? null)
const email = ref(user.value?.email ?? '')

function showMessage() {
  message.value = 'Perfil atualizado com sucesso!'

  setTimeout(() => {
    message.value = null
  }, 2000)
}

async function handleSubmit() {
  isLoading.value = true
  message.value = null

  try {
    await updateProfile(user.value as User, { displayName: name.value })

    showMessage()
  } catch (err) {
    alert('Não foi possível atualizar as informações da conta.')
  } finally {
    isLoading.value = false
  }
}

function handleSelectImage() {
  const fileInput = document.getElementById('file-input') as HTMLInputElement
  fileInput.click()
}

async function handleUploadImage() {
  const fileInput = document.getElementById('file-input') as HTMLInputElement
  const file = fileInput.files?.[0]

  if (!file) return

  const imageRef = storageRef(storage, `users/${user.value?.uid}/${file.name}`)

  try {
    uploadIsLoading.value = true

    const snapshot = await uploadBytes(imageRef, file)
    const fullPath = snapshot.ref.fullPath

    const imageUrl = await getDownloadURL(storageRef(storage, fullPath))

    await updateProfile(user.value as User, { photoURL: imageUrl })
    photoURL.value = imageUrl

    showMessage()
  } catch {
    alert('Não foi possível atualizar a foto de perfil.')
  } finally {
    uploadIsLoading.value = false
    fileInput.value = ''
  }
}
</script>

<template>
  <div class="account container">
    <header class="account__header">
      <h1>Minha Conta</h1>
      <p>Gerencie as informações de conta</p>
    </header>

    <div class="account__grid">
      <form @submit.prevent="handleSubmit()" class="account__form">
        <span class="message" v-if="message">{{ message }}</span>

        <div class="account__form-group">
          <label for="display-name">Nome do Usuário</label>
          <Field type="text" id="display-name" v-model="name" required />
        </div>

        <div class="account__form-group">
          <label for="email">E-mail</label>
          <Field type="text" id="email" v-model="email" disabled />
        </div>

        <Button type="submit" :disabled="isLoading">
          <Save :size="20" />
          {{ isLoading ? 'Salvando...' : 'Atualizar informações' }}
        </Button>
      </form>

      <div class="change-picture">
        <span>Foto de perfil</span>

        <img
          v-if="photoURL"
          :src="photoURL"
          :alt="`Foto de perfil de ${user?.displayName}`"
        />

        <img v-else src="@/assets/avatar.png" alt="" />

        <input type="file" id="file-input" @change="handleUploadImage" hidden />

        <Button
          @click="handleSelectImage()"
          :disabled="uploadIsLoading"
          type="button"
        >
          <Image :size="20" />
          {{ uploadIsLoading ? 'Carregando...' : 'Alterar foto' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account {
  &__header {
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

  &__grid {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    max-width: 600px;
    width: 100%;
  }

  &__form-group {
    width: 100%;

    label {
      font-size: 1rem;
      display: block;
      margin-bottom: 0.25rem;
      color: var(--text-primary);
    }
  }
}

.message {
  color: var(--text-success);
}

.change-picture {
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-bottom: 0.5rem;
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }

  button {
    margin-top: 1rem;
  }
}
</style>
