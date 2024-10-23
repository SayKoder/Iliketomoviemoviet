<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavView from './components/NavView.vue'
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
