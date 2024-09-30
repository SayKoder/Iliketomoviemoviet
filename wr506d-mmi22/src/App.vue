<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavView from './views/NavView.vue'
</script>

<template>
  <header>
    <NavView />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;

}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
