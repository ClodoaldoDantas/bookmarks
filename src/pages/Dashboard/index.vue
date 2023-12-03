<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <Layout>
    <Sidebar />

    <main class="content">
      <router-view></router-view>
    </main>
  </Layout>
</template>

<style lang="scss" scoped>
.content {
  padding: 2rem;
}
</style>
