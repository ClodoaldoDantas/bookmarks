<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'
import { handleSignUpError } from '@/utils/handler-auth-errors'

import Logo from '@/components/Logo.vue'
import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const isLoading = ref(false)

const state = reactive({
  name: '',
  email: '',
  password: '',
})

const router = useRouter()

async function handleSubmit() {
  isLoading.value = true

  try {
    const { name, email, password } = state

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(userCredential.user, {
      displayName: name,
    })

    router.push('/dashboard')
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = handleSignUpError(error.code)
      alert(errorMessage)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="main">
    <div class="card">
      <Logo />

      <form @submit.prevent="handleSubmit()">
        <Field type="text" placeholder="Nome" v-model="state.name" required />
        <Field
          type="email"
          placeholder="E-mail"
          v-model="state.email"
          required
        />
        <Field
          type="password"
          placeholder="Senha"
          v-model="state.password"
          required
        />

        <Button type="submit" :disabled="isLoading">
          <LogIn :size="20" />
          Crie sua conta agora
        </Button>
      </form>

      <p class="link">
        Já tem uma conta?
        <router-link to="/">Conecte-se</router-link>
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  max-width: 480px;
  width: 100%;

  padding: 2rem;
  background-color: var(--card);
  border-radius: 0.25rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);

  a {
    color: var(--action);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
