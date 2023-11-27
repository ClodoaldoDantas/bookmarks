<script setup lang="ts">
import { ref } from 'vue'
import { LogIn } from 'lucide-vue-next'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useRouter } from 'vue-router'

import Logo from '../components/Logo.vue'
import Field from '../components/Field.vue'
import Button from '../components/Button.vue'

const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

async function handleSubmit() {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)

    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main class="main">
    <div class="card">
      <Logo />

      <form @submit.prevent="handleSubmit()">
        <Field type="text" placeholder="Nome" v-model="name" required />
        <Field type="email" placeholder="E-mail" v-model="email" required />
        <Field
          type="password"
          placeholder="Senha"
          v-model="password"
          required
        />

        <Button type="submit">
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
