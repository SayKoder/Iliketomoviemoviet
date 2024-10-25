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

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: Arial, sans-serif;
}
header {
  line-height: 1.5;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
