<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavView from './views/NavView.vue'
</script>

<template>
  <header>
    <NavView />
  </header>
  <body>
    <h1>Test</h1>
  </body>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
