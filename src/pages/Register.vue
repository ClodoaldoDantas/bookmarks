<script setup lang="ts">
import { LogIn } from 'lucide-vue-next'

import Logo from '../components/Logo.vue'
import Field from '../components/Field.vue'
import Button from '../components/Button.vue'
</script>

<template>
  <main class="main">
    <div class="card">
      <Logo />

      <form>
        <Field type="text" placeholder="Nome" />
        <Field type="text" placeholder="E-mail" />
        <Field type="password" placeholder="Senha" />

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
