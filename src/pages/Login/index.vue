<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'
import { handleSignInError } from '@/utils/handler-auth-errors'

import Logo from '@/components/Logo.vue'
import Field from '@/components/Field.vue'
import Button from '@/components/Button.vue'

const isLoading = ref(false)

const state = reactive({
  email: '',
  password: '',
})

const router = useRouter()

async function handleSubmit() {
  isLoading.value = true

  try {
    const { email, password } = state
    await signInWithEmailAndPassword(auth, email, password)

    router.push('/dashboard')
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = handleSignInError(error.code)
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
        <Field
          type="text"
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
          Entrar na sua conta
        </Button>
      </form>

      <p class="link">
        Não tem uma conta?
        <router-link to="/signup">Crie uma agora</router-link>
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
