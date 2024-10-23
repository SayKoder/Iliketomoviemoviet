<script lang="ts" setup>
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/')
}

watchEffect(() => {
  authStore.checkAuth()
})
</script>

<template>
  <div class="wrapper">
    <nav>
      <ul>
        <li><router-link to="/" exact>Accueil</router-link></li>
        <li><router-link to="/movies">Movies</router-link></li>
        <li><router-link to="/actors">Actor</router-link></li>
        <li><router-link to="/categories">Catégories</router-link></li>
        <li v-if="authStore.isAuthenticated">
          <router-link to="/" @click.prevent="logout">Déconnexion</router-link>
        </li>
        <li v-else>
          <router-link to="/connexion">Connexion</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 70px;
  background-color: #a04545;
  border-bottom: 4px solid #5f1b1b;
}

nav ul {
  display: flex;
  flex-direction: row;
  gap: 40px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline;
}

nav ul li:last-child {
  margin-left: 30px;
}

.wrapper .logo {
  margin-right: 20px;
}

a {
  text-decoration: none;
  color: white;
  box-shadow: inset 0 -2px 0 0 rgb(255, 226, 146);
}
</style>
